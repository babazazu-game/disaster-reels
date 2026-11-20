# Персонажи «Крути хаос!» в Blender (по листу концептов art/concepts/characters_v1.jpg).
# Запуск (фоновый Blender, MCP не нужен):
#   blender -b --factory-startup --python art/chars/build.py -- [id ...]
# На выходе: assets/chars/<id>.glb (модель для игры) и art/chars/render/<id>.png (портрет для карточки).
#
# Устройство модели (его читает src/engine/charModel.ts):
#  - пустышки pv_<кость> — шарниры (плечи, бёдра, шея), игра ставит в них кости;
#  - у каждого меша в extras поле bone — к какой кости он прикручен;
#  - материал 'face' — лицо (текстура берётся отдельно, assets/chars/faces/<id>.webp),
#    'glass' — прозрачное стекло (шлем космонавта), остальные — просто цвет.
# Персонаж смотрит в −Y (в glTF/three это +Z, как старый аватар).
import bpy, bmesh, json, math, os, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
FACES = json.load(open(os.path.join(ROOT, 'art/chars/faces.json')))
D2R = math.pi / 180


def lin(hexs):
    h = hexs.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c] + [1]


MATS = {}


def mat(hexs):
    if hexs in MATS:
        return MATS[hexs]
    m = bpy.data.materials.new('c_' + hexs.lstrip('#'))
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = lin(hexs)
    b.inputs['Roughness'].default_value = 0.5
    MATS[hexs] = m
    return m


OBJS = []


def tag(o, bone, m):
    o.data.materials.append(m)
    o['bone'] = bone
    OBJS.append(o)
    return o


def bevel(o, w, seg=1):
    if w <= 0:
        return
    md = o.modifiers.new('bev', 'BEVEL')
    md.width = w
    md.segments = seg
    md.limit_method = 'ANGLE'


def box(bone, size, loc, col, bev=0.025, rot=(0, 0, 0), seg=1):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=[r * D2R for r in rot])
    o = bpy.context.object
    o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    bevel(o, min(bev, min(size) * 0.45), seg)
    return tag(o, bone, mat(col))


def cyl(bone, r, h, loc, col, verts=20, rot=(0, 0, 0), r2=None):
    if r2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=h, location=loc, rotation=[a * D2R for a in rot])
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r, radius2=r2, depth=h, location=loc, rotation=[a * D2R for a in rot])
    o = bpy.context.object
    bpy.ops.object.shade_smooth() if verts > 8 else None
    return tag(o, bone, mat(col))


def ball(bone, r, loc, col, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=10, radius=r, location=loc)
    o = bpy.context.object
    o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    bpy.ops.object.shade_smooth()
    return tag(o, bone, mat(col))


def spike(bone, r, h, loc, col, rot=(0, 0, 0)):
    return cyl(bone, r, h, loc, col, verts=4, rot=rot, r2=0)


def pivot(name, loc):
    e = bpy.data.objects.new('pv_' + name, None)
    e.location = loc
    bpy.context.collection.objects.link(e)
    OBJS.append(e)


# ── общее тело ───────────────────────────────────────────────────────────────
HEAD_Z0, HEAD = 1.75, (0.95, 0.9, 0.9)


def body(s):
    skin = s['skin']
    hands = s.get('hands', skin)
    shoeH = s.get('shoeH', 0.22)
    for bone, x in (('legL', -0.25), ('legR', 0.25)):
        box(bone, (0.47, 0.5, 0.85 - shoeH), (x, 0, shoeH + (0.85 - shoeH) / 2), s['pants'])
        box(bone, (0.47, 0.52, shoeH), (x, -0.01, shoeH / 2), s['shoes'])
    box('torso', (1.0, 0.5, 0.9), (0, 0, 1.3), s['shirt'])
    sl = s.get('sleeve', 0.4)
    top = 0.85 * sl
    for bone, x in (('armL', -0.72), ('armR', 0.72)):
        if top > 0:
            box(bone, (0.42, 0.46, top), (x, 0, 1.75 - top / 2), s['shirt'])
        box(bone, (0.42, 0.46, 0.85 - top), (x, 0, 0.9 + (0.85 - top) / 2), hands)
    hw, hd, hh = s.get('head', HEAD)
    box('head', (hw, hd, hh), (0, 0, HEAD_Z0 + hh / 2), s.get('headColor', skin), bev=0.06, seg=2)
    # лицо — плоскость перед передней гранью головы
    fw, fh = s.get('face', (0.84, 0.8))
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -hd / 2 - 0.004, HEAD_Z0 + hh / 2 + s.get('faceDz', 0)), rotation=(90 * D2R, 0, 0))
    f = bpy.context.object
    f.scale = (fw, fh, 1)
    bpy.ops.object.transform_apply(scale=True)
    fm = bpy.data.materials.new('face')
    fm.use_nodes = True
    nt = fm.node_tree
    tex = nt.nodes.new('ShaderNodeTexImage')
    p = os.path.join(ROOT, 'art/chars/faces', s['id'] + '.png')
    if os.path.exists(p):
        tex.image = bpy.data.images.load(p)
        nt.links.new(tex.outputs['Color'], nt.nodes['Principled BSDF'].inputs['Base Color'])
    nt.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.5
    tag(f, 'head', fm)
    pivot('legL', (-0.25, 0, 0.85)); pivot('legR', (0.25, 0, 0.85)); pivot('torso', (0, 0, 0.85))
    pivot('armL', (-0.72, 0, 1.62)); pivot('armR', (0.72, 0, 1.62)); pivot('head', (0, 0, HEAD_Z0))


def bands(bone_pairs, z, col, w=0.44, d=0.48, h=0.08):
    for bone, x in bone_pairs:
        box(bone, (w, d, h), (x, 0, z), col, bev=0.015)


ARMS = (('armL', -0.72), ('armR', 0.72))
LEGS = (('legL', -0.25), ('legR', 0.25))
HT = HEAD_Z0 + 0.9   # макушка


def hair_basic(col, fringe=True):
    box('head', (1.0, 0.95, 0.16), (0, 0.0, HT + 0.05), col, bev=0.05)
    box('head', (1.0, 0.14, 0.55), (0, 0.43, HT - 0.25), col, bev=0.04)
    for x in (-0.49, 0.49):
        box('head', (0.08, 0.6, 0.3), (x, 0.12, HT - 0.12), col, bev=0.03)
    if fringe:
        for i, x in enumerate((-0.3, 0.0, 0.3)):
            box('head', (0.34, 0.1, 0.15), (x, -0.46, HT - 0.04), col, bev=0.03, rot=(0, (i - 1) * 6, 0))


def hair_sides(col):
    for x in (-0.49, 0.49):
        box('head', (0.07, 0.55, 0.3), (x, 0.1, HT - 0.2), col, bev=0.02)


# ── персонажи ────────────────────────────────────────────────────────────────
def rookie(s):
    body(s)
    hair_basic('#5a3416')
    box('torso', (0.5, 0.05, 0.12), (0, -0.26, 1.52), '#ffffff', bev=0.02)   # полоска на футболке


def sparky(s):
    body(s)
    Y = '#ffd21f'
    box('torso', (1.02, 0.52, 0.1), (0, 0, 1.22), Y, bev=0.015)
    bands(ARMS, 1.3, Y)
    bands(LEGS, 0.4, Y, w=0.49, d=0.52)
    box('head', (1.0, 0.95, 0.3), (0, 0.02, HT + 0.15), '#e8322c', bev=0.08, seg=2)
    box('head', (1.28, 1.22, 0.07), (0, 0.04, HT + 0.03), '#d42a25', bev=0.03)
    box('head', (0.3, 0.05, 0.26), (0, -0.48, HT + 0.18), Y, bev=0.03)


def orbit(s):
    body(s)
    T, O = '#1fc2c9', '#ff7a1a'
    bands(ARMS, 1.25, T)
    bands(LEGS, 0.42, T, w=0.49, d=0.52)
    box('torso', (1.02, 0.52, 0.09), (0, 0, 0.96), O, bev=0.015)
    box('torso', (0.26, 0.05, 0.22), (-0.2, -0.26, 1.42), O, bev=0.02)
    box('torso', (0.16, 0.05, 0.07), (0.2, -0.26, 1.48), T, bev=0.01)
    box('torso', (0.16, 0.05, 0.07), (0.2, -0.26, 1.36), T, bev=0.01)
    cyl('torso', 0.56, 0.12, (0, 0, 1.76), '#e3e3ea', verts=24)
    g = ball('head', 0.82, (0, 0, HEAD_Z0 + 0.45), '#bfe6ff')
    g.data.materials[0] = glass()


def glass():
    m = bpy.data.materials.get('glass')
    if m:
        return m
    m = bpy.data.materials.new('glass')
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = lin('#bfe6ff')
    b.inputs['Alpha'].default_value = 0.28
    b.inputs['Roughness'].default_value = 0.05
    m.surface_render_method = 'BLENDED' if hasattr(m, 'surface_render_method') else None
    return m


def biscuit(s):
    body(s)
    R = '#e8332f'
    box('torso', (0.92, 0.06, 0.55), (0, -0.27, 0.98), R, bev=0.02)
    for x in (-0.16, 0.16):
        for z in (1.5, 1.33):
            box('torso', (0.1, 0.04, 0.1), (x, -0.26, z), R, bev=0.02)
    box('torso', (0.34, 0.04, 0.34), (0, -0.265, 1.72), R, bev=0.02, rot=(0, 45, 0))
    hair_sides('#6b3b1e')
    cyl('head', 0.43, 0.42, (0, 0, HT + 0.2), '#f7f5f2', verts=24)
    ball('head', 0.5, (0, 0, HT + 0.5), '#ffffff', scale=(1, 1, 0.55))


def patch(s):
    body(s)
    M = '#d1206e'
    box('torso', (0.24, 0.05, 0.86), (0, -0.26, 1.3), '#f0d9a8', bev=0.01)
    for x in (-0.22, 0.22):
        for z in (1.52, 1.38):
            box('torso', (0.16, 0.05, 0.06), (x, -0.27, z), '#ffd21f', bev=0.015)
    box('torso', (1.03, 0.53, 0.13), (0, 0, 0.98), M, bev=0.02)
    box('torso', (0.14, 0.06, 0.32), (0.32, -0.28, 0.82), M, bev=0.02, rot=(0, -8, 0))
    hair_sides('#4a2a14')
    box('head', (1.0, 0.95, 0.2), (0, 0, HT + 0.06), M, bev=0.06, seg=2)
    box('head', (1.0, 0.06, 0.13), (0, -0.465, HT - 0.06), M, bev=0.02)
    box('head', (0.12, 0.2, 0.2), (0.53, 0.05, HT - 0.02), M, bev=0.03)
    box('head', (0.08, 0.14, 0.38), (0.56, 0.2, HT - 0.22), M, bev=0.02, rot=(25, 0, 10))
    box('head', (0.08, 0.14, 0.32), (0.56, -0.05, HT - 0.24), M, bev=0.02, rot=(-15, 0, 15))


def bleep(s):
    body(s)
    L, G = '#9be22d', '#8a8f99'
    for x in (-0.52, 0.52):
        box('head', (0.1, 0.38, 0.38), (x, 0, HEAD_Z0 + 0.46), L, bev=0.03)
    cyl('head', 0.04, 0.3, (0, 0, HT + 0.17), G, verts=10)
    box('head', (0.17, 0.17, 0.12), (0, 0, HT + 0.36), L, bev=0.03)
    box('torso', (0.55, 0.05, 0.2), (0, -0.26, 1.48), L, bev=0.02)
    for x in (-0.17, 0, 0.17):
        box('torso', (0.1, 0.05, 0.1), (x, -0.26, 1.22), L, bev=0.015)
    bands(ARMS, 1.02, L)
    bands(LEGS, 0.32, L, w=0.49, d=0.52)


def clank(s):
    body(s)
    B, A, Dk = '#2f6fe0', '#b9bec7', '#3a3f48'
    for bone, x in ARMS:
        box(bone, (0.5, 0.54, 0.2), (x, 0, 1.72), B, bev=0.04)
    box('torso', (1.02, 0.52, 0.1), (0, 0, 1.05), B, bev=0.015)
    bands(LEGS, 0.36, B, w=0.49, d=0.52)
    box('head', (1.08, 1.02, 0.32), (0, 0, HT + 0.1), A, bev=0.05, seg=2)
    for x in (-0.26, 0, 0.26):
        box('head', (0.08, 0.02, 0.18), (x, -0.515, HT + 0.08), Dk, bev=0.005)
    for x in (-0.52, 0.52):
        box('head', (0.06, 1.02, 0.8), (x, 0, HEAD_Z0 + 0.42), A, bev=0.02)
    box('head', (1.08, 0.06, 0.8), (0, 0.49, HEAD_Z0 + 0.42), A, bev=0.02)
    box('head', (0.12, 0.12, 0.3), (0, 0.0, HT + 0.4), B, bev=0.03)
    box('head', (0.12, 0.3, 0.12), (0, 0.1, HT + 0.55), B, bev=0.03)
    box('head', (0.12, 0.12, 0.2), (0, 0.22, HT + 0.46), B, bev=0.03)


def chomps(s):
    body(s)
    G, Y, Gd = '#3fbf3a', '#ffd21f', '#2f9e2c'
    box('torso', (0.62, 0.06, 0.62), (0, -0.26, 1.28), Y, bev=0.03)
    box('head', (1.1, 1.04, 0.3), (0, 0.02, HT + 0.12), G, bev=0.06, seg=2)
    box('head', (1.1, 0.1, 0.12), (0, -0.5, HT - 0.06), G, bev=0.03)
    for x in (-0.36, -0.12, 0.12, 0.36):
        box('head', (0.12, 0.05, 0.12), (x, -0.51, HT - 0.16), '#ffffff', bev=0.01, rot=(0, 45, 0))
    for x in (-0.53, 0.53):
        box('head', (0.07, 1.04, 0.8), (x, 0.02, HEAD_Z0 + 0.42), G, bev=0.02)
    box('head', (1.1, 0.07, 0.8), (0, 0.5, HEAD_Z0 + 0.42), G, bev=0.02)
    for x in (-0.22, 0.22):
        box('head', (0.11, 0.04, 0.11), (x, -0.5, HT + 0.18), '#151515', bev=0.01)
    for y, z in ((0.1, HT + 0.3), (0.42, HT + 0.18), (0.56, HT - 0.15), (0.56, HT - 0.5)):
        spike('head', 0.13, 0.26, (0, y, z), Y, rot=(-60, 0, 45))
    for z in (1.6, 1.35, 1.1):
        spike('torso', 0.12, 0.24, (0, 0.3, z), Y, rot=(-90, 0, 45))
    box('torso', (0.32, 0.45, 0.3), (0, 0.42, 0.95), G, bev=0.05, rot=(30, 0, 0))
    box('torso', (0.2, 0.4, 0.2), (0, 0.75, 0.78), Gd, bev=0.04, rot=(25, 0, 0))
    spike('torso', 0.08, 0.18, (0, 0.55, 1.12), Y, rot=(-90, 0, 45))


def wizzle(s):
    body(s)
    P, T = '#8a3be0', '#22c9c9'
    box('torso', (0.16, 0.05, 0.9), (0, -0.26, 1.3), T, bev=0.01)
    box('torso', (1.03, 0.53, 0.08), (0, 0, 0.9), T, bev=0.015)
    box('torso', (1.04, 0.56, 0.32), (0, 0, 0.72), P, bev=0.03)
    bands(ARMS, 1.02, T)
    hair_sides('#5a3416')
    cyl('head', 0.72, 0.07, (0, 0, HT + 0.03), P, verts=28)
    cyl('head', 0.46, 0.9, (0, 0, HT + 0.5), P, verts=24, r2=0.0)
    cyl('head', 0.47, 0.11, (0, 0, HT + 0.12), T, verts=24)


def nana(s):
    body(s)
    Y, Br = '#ffd92a', '#6b3b1e'
    for x in (-0.53, 0.53):
        box('head', (0.09, 1.0, 0.96), (x, 0.02, HEAD_Z0 + 0.46), Y, bev=0.03)
    box('head', (1.15, 0.09, 0.96), (0, 0.5, HEAD_Z0 + 0.46), Y, bev=0.03)
    box('head', (1.15, 0.09, 0.1), (0, -0.49, HT - 0.02), Y, bev=0.03)
    box('head', (1.15, 0.09, 0.1), (0, -0.49, HEAD_Z0 + 0.02), Y, bev=0.03)
    cyl('head', 0.8, 0.7, (0, 0.02, HT + 0.33), Y, verts=4, rot=(0, 0, 45), r2=0.13)
    box('head', (0.16, 0.16, 0.2), (0, 0.02, HT + 0.75), Br, bev=0.03)
    box('torso', (0.08, 0.05, 0.75), (0, -0.26, 1.28), '#f2c21a', bev=0.01)


def zoom(s):
    body(s)
    R, Y, H = '#e8322c', '#ffd21f', '#3a2414'
    box('torso', (1.02, 0.52, 0.1), (0, 0, 1.0), Y, bev=0.015)
    box('torso', (0.45, 0.05, 0.1), (-0.15, -0.26, 1.6), R, bev=0.01, rot=(0, 35, 0))
    box('torso', (0.45, 0.05, 0.1), (0.15, -0.26, 1.6), R, bev=0.01, rot=(0, -35, 0))
    box('torso', (1.1, 0.05, 1.15), (0, 0.3, 1.2), R, bev=0.02, rot=(-8, 0, 0))
    box('torso', (1.04, 0.54, 0.07), (0, 0, 1.74), R, bev=0.015)
    box('head', (1.0, 0.95, 0.16), (0, 0, HT + 0.05), H, bev=0.04)
    box('head', (1.0, 0.14, 0.5), (0, 0.43, HT - 0.2), H, bev=0.04)
    for x in (-0.49, 0.49):
        box('head', (0.08, 0.5, 0.25), (x, 0.15, HT - 0.1), H, bev=0.03)
    for x, y, rz, rx in ((-0.3, -0.25, 15, -25), (0.0, -0.3, 0, -30), (0.3, -0.2, -15, -25), (-0.2, 0.15, 20, 15), (0.22, 0.2, -20, 20)):
        box('head', (0.28, 0.28, 0.34), (x, y, HT + 0.2), H, bev=0.03, rot=(rx, 0, rz))


# ── вторая партия: свои персонажи (не из чужих мультфильмов) ─────────────────
def hood(col, top=0.28, side=0.8):
    box('head', (1.1, 1.04, top), (0, 0.02, HT + top / 2 - 0.02), col, bev=0.06, seg=2)
    for x in (-0.53, 0.53):
        box('head', (0.07, 1.04, side), (x, 0.02, HEAD_Z0 + side / 2 + 0.02), col, bev=0.02)
    box('head', (1.1, 0.07, side), (0, 0.5, HEAD_Z0 + side / 2 + 0.02), col, bev=0.02)


def shadow(s):
    body(s)
    R = '#e8322c'
    box('head', (0.99, 0.94, 0.1), (0, 0, HT - 0.12), R, bev=0.02)
    box('head', (0.1, 0.34, 0.07), (0.12, 0.6, HT - 0.18), R, bev=0.01, rot=(-25, 0, 20))
    box('head', (0.1, 0.3, 0.07), (-0.08, 0.6, HT - 0.22), R, bev=0.01, rot=(-35, 0, -15))
    box('torso', (1.02, 0.52, 0.1), (0, 0, 1.0), R, bev=0.015)
    box('torso', (0.08, 0.06, 1.15), (0, 0.3, 1.35), '#c9ced8', bev=0.01, rot=(0, 40, 0))
    box('torso', (0.13, 0.1, 0.3), (-0.38, 0.31, 1.82), '#3a3f48', bev=0.02, rot=(0, 40, 0))
    bands(ARMS, 1.0, '#3a3c48')
    bands(LEGS, 0.3, '#3a3c48', w=0.49, d=0.52)


def bjorn(s):
    body(s)
    G, Hn, B, F = '#9aa1ad', '#f2e6c8', '#e0702a', '#c9b28f'
    box('head', (1.02, 0.97, 0.3), (0, 0, HT + 0.12), G, bev=0.08, seg=2)
    box('head', (1.06, 1.01, 0.08), (0, 0, HT - 0.02), '#7d8490', bev=0.02)
    cyl('head', 0.12, 0.5, (0.66, 0, HT + 0.2), Hn, verts=12, rot=(0, 65, 0), r2=0.02)
    cyl('head', 0.12, 0.5, (-0.66, 0, HT + 0.2), Hn, verts=12, rot=(0, -65, 0), r2=0.02)
    box('head', (0.92, 0.14, 0.34), (0, -0.48, HEAD_Z0 + 0.02), B, bev=0.05)
    box('head', (0.5, 0.12, 0.18), (0, -0.46, HEAD_Z0 - 0.2), B, bev=0.04)
    for x in (-0.49, 0.49):
        box('head', (0.08, 0.4, 0.45), (x, -0.1, HEAD_Z0 + 0.25), B, bev=0.02)
    box('torso', (1.06, 0.56, 0.14), (0, 0, 1.72), F, bev=0.04)
    box('torso', (1.02, 0.52, 0.12), (0, 0, 0.98), '#5a3a20', bev=0.015)
    box('torso', (0.18, 0.05, 0.14), (0, -0.27, 0.98), '#ffd21f', bev=0.02)
    bands(LEGS, 0.3, F, w=0.5, d=0.54, h=0.14)


def mumbo(s):
    body(s)
    Dk = '#d8cdb0'
    for z, r in ((1.62, 7), (1.4, -6), (1.15, 5), (0.95, -4)):
        box('torso', (1.03, 0.53, 0.05), (0, 0, z), Dk, bev=0.01, rot=(0, r, 0))
    for bone, x in ARMS:
        for z, r in ((1.5, 9), (1.2, -8)):
            box(bone, (0.44, 0.48, 0.05), (x, 0, z), Dk, bev=0.01, rot=(0, r, 0))
    for bone, x in LEGS:
        for z, r in ((0.65, -7), (0.35, 8)):
            box(bone, (0.49, 0.52, 0.05), (x, 0, z), Dk, bev=0.01, rot=(0, r, 0))
    for z, r in ((HT - 0.08, 6), (HEAD_Z0 + 0.12, -5)):
        box('head', (0.98, 0.93, 0.06), (0, 0, z), Dk, bev=0.01, rot=(0, r, 0))
    box('armR', (0.08, 0.04, 0.35), (0.95, -0.1, 0.95), Dk, bev=0.01, rot=(0, 30, 0))


def zeeb(s):
    body(s)
    P, Pk = '#8a3be0', '#ff5fb0'
    for x in (-0.25, 0.25):
        cyl('head', 0.035, 0.45, (x * 1.2, 0, HT + 0.2), s['skin'], verts=10, rot=(0, 25 if x > 0 else -25, 0))
        ball('head', 0.1, (x * 1.6, 0, HT + 0.43), Pk)
    cyl('torso', 0.55, 0.1, (0, 0, 1.76), P, verts=24)
    box('torso', (1.02, 0.52, 0.1), (0, 0, 1.0), P, bev=0.015)
    box('torso', (0.24, 0.05, 0.24), (0, -0.27, 1.42), '#ffd21f', bev=0.02, rot=(0, 45, 0))
    bands(ARMS, 1.0, P)
    bands(LEGS, 0.3, P, w=0.49, d=0.52)


def mittens(s):
    body(s)
    O, W, Pk = '#ff9a3c', '#fff4e6', '#ff8fb5'
    hood(O)
    for x in (-0.3, 0.3):
        spike('head', 0.22, 0.32, (x, 0.02, HT + 0.38), O, rot=(0, 0, 45))
        spike('head', 0.12, 0.2, (x, -0.1, HT + 0.33), Pk, rot=(0, 0, 45))
    box('torso', (0.6, 0.06, 0.62), (0, -0.26, 1.28), W, bev=0.03)
    box('torso', (0.2, 0.5, 0.2), (0, 0.42, 0.95), O, bev=0.05, rot=(-40, 0, 0))
    box('torso', (0.18, 0.18, 0.45), (0, 0.66, 1.25), O, bev=0.05, rot=(10, 0, 0))
    box('torso', (0.19, 0.19, 0.18), (0, 0.7, 1.52), W, bev=0.05)


def pumpky(s):
    body(s)
    G, Od = '#3f9a2a', '#e8761a'
    box('head', (0.16, 0.16, 0.24), (0, 0.04, HT + 0.12), '#6b4a2e', bev=0.03, rot=(8, 0, 0))
    box('head', (0.3, 0.16, 0.05), (0.15, 0.02, HT + 0.08), G, bev=0.02, rot=(0, -20, 30))
    hw, hd = s['head'][0], s['head'][1]
    for y in (-0.22, 0.0, 0.22):
        for x in (-hw / 2 - 0.01, hw / 2 + 0.01):
            box('head', (0.04, 0.1, s['head'][2] - 0.14), (x, y, HEAD_Z0 + s['head'][2] / 2), Od, bev=0.015)
    box('torso', (1.02, 0.52, 0.1), (0, 0, 1.0), '#ff8a1c', bev=0.015)
    box('torso', (0.22, 0.05, 0.2), (0, -0.27, 1.62), '#ff8a1c', bev=0.02, rot=(0, 45, 0))


def roxy(s):
    body(s)
    Hp, K, Gd = '#ff4fa8', '#222228', '#ffd21f'
    box('head', (1.02, 0.97, 0.16), (0, 0, HT + 0.05), Hp, bev=0.05)
    box('head', (1.04, 0.16, 1.05), (0, 0.44, HT - 0.5), Hp, bev=0.04)
    for x in (-0.5, 0.5):
        box('head', (0.1, 0.75, 0.85), (x, 0.08, HT - 0.4), Hp, bev=0.03)
    box('head', (0.6, 0.1, 0.18), (-0.2, -0.47, HT - 0.06), Hp, bev=0.03, rot=(0, -12, 0))
    for x, h in ((-0.18, 0.14), (0, 0.2), (0.18, 0.14)):
        spike('head', 0.07, h, (x, -0.3, HT + 0.13 + h / 2), Gd, rot=(0, 0, 45))
    box('head', (0.5, 0.06, 0.06), (0, -0.3, HT + 0.14), Gd, bev=0.01)
    box('torso', (0.3, 0.05, 0.88), (0, -0.26, 1.3), Hp, bev=0.01)
    for x in (-0.3, 0.3):
        box('torso', (0.05, 0.05, 0.85), (x * 0.62, -0.27, 1.3), '#c9ced8', bev=0.01)
    box('torso', (0.5, 0.12, 0.6), (0.1, 0.33, 1.15), '#e8322c', bev=0.06, rot=(0, -30, 0))
    box('torso', (0.1, 0.08, 0.75), (-0.25, 0.33, 1.65), '#6b4a2e', bev=0.02, rot=(0, -30, 0))
    bands(LEGS, 0.25, Hp, w=0.49, d=0.53, h=0.05)


CHARS = {
    'rookie': (rookie, dict(shirt='#ff5a36', pants='#2f5fb8', shoes='#f4f4f4', sleeve=0.35)),
    'sparky': (sparky, dict(shirt='#e8322c', pants='#e8322c', shoes='#3a2418', sleeve=0.85)),
    'orbit': (orbit, dict(shirt='#f2f2f5', pants='#f2f2f5', shoes='#c9cbd3', sleeve=1, hands='#f2f2f5')),
    'biscuit': (biscuit, dict(shirt='#f6f4f2', pants='#ecebe8', shoes='#3a2c26', sleeve=0.85)),
    'patch': (patch, dict(shirt='#23306b', pants='#1d2550', shoes='#6b3b1e', sleeve=0.85, shoeH=0.26)),
    'bleep': (bleep, dict(shirt='#2a5ee8', pants='#2a5ee8', shoes='#1d3fb0', sleeve=1, skin='#2a5ee8', head=(1.0, 0.9, 0.92), face=(0.76, 0.62))),
    'clank': (clank, dict(shirt='#b9bec7', pants='#b9bec7', shoes='#8d939c', sleeve=1, hands='#b9bec7')),
    'chomps': (chomps, dict(shirt='#3fbf3a', pants='#3fbf3a', shoes='#2f9e2c', sleeve=1, hands='#3fbf3a')),
    'wizzle': (wizzle, dict(shirt='#8a3be0', pants='#4a2a8a', shoes='#3a1f66', sleeve=0.85)),
    'nana': (nana, dict(shirt='#ffd92a', pants='#ffd92a', shoes='#6b3b1e', sleeve=1, hands='#ffd92a')),
    'shadow': (shadow, dict(shirt='#22232c', pants='#22232c', shoes='#16161c', sleeve=1, hands='#22232c')),
    'bjorn': (bjorn, dict(shirt='#a8452c', pants='#6b4a2e', shoes='#4a3420', sleeve=0.8)),
    'mumbo': (mumbo, dict(shirt='#efe6cf', pants='#efe6cf', shoes='#d8cdb0', sleeve=1, hands='#efe6cf')),
    'zeeb': (zeeb, dict(shirt='#b9c2d4', pants='#b9c2d4', shoes='#8a3be0', sleeve=0.8, head=(1.05, 0.95, 0.95))),
    'mittens': (mittens, dict(shirt='#ff9a3c', pants='#ff9a3c', shoes='#fff4e6', sleeve=1, hands='#fff4e6')),
    'pumpky': (pumpky, dict(shirt='#3b2a5c', pants='#2b2433', shoes='#16161c', sleeve=1, hands='#3f9a2a', head=(1.05, 1.0, 0.95))),
    'roxy': (roxy, dict(shirt='#222228', pants='#4a2a6a', shoes='#222228', sleeve=0.85)),
    'zoom': (zoom, dict(shirt='#2a56e0', pants='#2a56e0', shoes='#e8322c', sleeve=0.85, hands='#ffd21f', shoeH=0.3)),
}


def clear():
    for o in list(bpy.data.objects):
        bpy.data.objects.remove(o, do_unlink=True)
    for m in list(bpy.data.materials):
        bpy.data.materials.remove(m)
    for im in list(bpy.data.images):
        bpy.data.images.remove(im)
    MATS.clear()
    OBJS.clear()


def setup_render():
    sc = bpy.context.scene
    for eng in ('BLENDER_EEVEE', 'BLENDER_EEVEE_NEXT'):
        try:
            sc.render.engine = eng
            break
        except TypeError:
            pass
    sc.render.resolution_x = sc.render.resolution_y = 512
    sc.render.film_transparent = True
    sc.view_settings.view_transform = 'Standard'
    w = bpy.data.worlds.new('w') if not sc.world else sc.world
    sc.world = w
    w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.75, 0.78, 0.85, 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.9


def render(cid):
    sc = bpy.context.scene
    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam'))
    cam.data.type = 'ORTHO'
    cam.data.ortho_scale = 3.75
    a = -28 * D2R   # три четверти: персонаж чуть повёрнут
    cam.location = (math.sin(a) * 12, -math.cos(a) * 12, 1.72)
    cam.rotation_euler = (90 * D2R, 0, a)
    sc.collection.objects.link(cam)
    sc.camera = cam
    sun = bpy.data.objects.new('sun', bpy.data.lights.new('sun', 'SUN'))
    sun.data.energy = 3.2
    sun.rotation_euler = (50 * D2R, 0, -40 * D2R)
    sc.collection.objects.link(sun)
    sc.render.filepath = os.path.join(ROOT, 'art/chars/render', cid + '.png')
    bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(cam, do_unlink=True)
    bpy.data.objects.remove(sun, do_unlink=True)


def export(cid):
    # картинку лица в glb не кладём — игра грузит сжатую webp сама
    for m in bpy.data.materials:
        if m.name.startswith('face') and m.use_nodes:
            for n in list(m.node_tree.nodes):
                if n.type == 'TEX_IMAGE':
                    m.node_tree.nodes.remove(n)
    bpy.ops.object.select_all(action='DESELECT')
    for o in OBJS:
        o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=os.path.join(ROOT, 'assets/chars', cid + '.glb'), export_format='GLB',
                              use_selection=True, export_apply=True, export_extras=True, export_yup=True,
                              export_materials='EXPORT', export_texcoords=True, export_normals=True)


argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
os.makedirs(os.path.join(ROOT, 'art/chars/render'), exist_ok=True)
for cid, (fn, spec) in CHARS.items():
    if argv and cid not in argv:
        continue
    clear()
    setup_render()
    s = dict(spec)
    s['id'] = cid
    s.setdefault('skin', FACES.get(cid, '#f2ae7e'))
    fn(s)
    render(cid)
    export(cid)
    print('BUILT', cid, len(OBJS))
