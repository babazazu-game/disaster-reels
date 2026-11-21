import{U as Sn,c as xl,N as En,S as Ht,C as Be,R as bl,e as _t,w as lt,V as Jt,l as Ks,M as Qt,F as vc,W as js,a as Tn,b as Mt,L as Gn,H as Xn,D as ln,B as qt,d as Mi,f as he,p as Ml,g as qi,h as Si,i as ot,j as Ri,O as ks,P as vi,k as Dn,m as Xt,n as Zi,o as Ys,q as Sl,r as vt,E as El,A as Tl,s as Ga,t as Ut,u as Ln,v as gi,x as Ei,y as Ji,z as ni,G as wl,I as yl,J as Ti,K as Kt,Q as ya,T as wn,X as In,Y as Da,Z as Gt,_ as hn,$ as Al,a0 as pi,a1 as $s,a2 as Rl,a3 as Cl,a4 as Ui,a5 as Ll,a6 as Pl,a7 as Il,a8 as Dl,a9 as Ul,aa as Nl,ab as Ol,ac as Fl,ad as kl,ae as Bl,af as Gl,ag as Hl,ah as zl,ai as Vl,aj as Wl,ak as _c,al as ii,am as ba,an as zi,ao as xc,ap as Pn,aq as Xl,ar as Kl,as as Bs,at as jl,au as Gs,av as Yl,aw as $l,ax as ql,ay as et,az as Zl,aA as Jl,aB as Ql,aC as Ki,aD as ed,aE as Vi,aF as Hn,aG as td,aH as bc,aI as Mc,aJ as Sc,aK as Aa,aL as Ec,aM as Tc,aN as wc,aO as Wn,aP as nd,aQ as id,aR as ad,aS as sd,aT as yc,aU as rd,aV as od,aW as cd,aX as Ha,aY as za,aZ as Va,a_ as Wa,a$ as qs,b0 as Zs,b1 as Js,b2 as Qs,b3 as er,b4 as tr,b5 as nr,b6 as ir,b7 as ar,b8 as _s,b9 as sr,ba as rr,bb as or,bc as cr,bd as lr,be as dr,bf as fr,bg as ur,bh as hr,bi as pr,bj as mr,bk as gr,bl as vr,bm as _r,bn as xr,bo as br,bp as Mr,bq as Sr,br as Er,bs as Tr,bt as xs,bu as wr,bv as ld,bw as dd,bx as fd,by as ud,bz as hd,bA as pd,bB as md,bC as gd,bD as yr,bE as vd,bF as ji,bG as _d,bH as Ar,bI as Rr,bJ as bs,bK as Ac,bL as xd,bM as Cr,bN as bd,bO as Rc,bP as Ms,bQ as Cc,bR as Md,bS as Lc,bT as Hs,bU as Pc,bV as Ic,bW as Dc,bX as Uc,bY as Nc,bZ as Lr,b_ as Oc,b$ as Xa,c0 as Ka,c1 as Sd,c2 as Ed,c3 as Pr,c4 as Zt,c5 as Td,c6 as wd,c7 as yd,c8 as Ad,c9 as Rd,ca as Cd,cb as Ra,cc as Ld,cd as Pd,ce as Id,cf as un,cg as en,ch as Jn,ci as Fc,cj as kc,ck as Bc,cl as an,cm as ea,cn as zs,co as Dd,cp as Ss,cq as Gc,cr as Ud,cs as bn,ct as Nd,cu as Od,cv as Hc,cw as _i,cx as Ua,cy as kn,cz as Fd,cA as Es,cB as Ts,cC as kd,cD as pn,cE as xn,cF as Bd,cG as Wt,cH as ti,cI as Gd,cJ as Hd,cK as gt,cL as zd,cM as Yi,cN as zc,cO as yn,cP as Vd,cQ as Vc,cR as Wd,cS as Xd,cT as Kd,cU as jd,cV as ja,cW as Yd,cX as $d,cY as qd,cZ as Zd,c_ as Jd,c$ as Qd,d0 as ef,d1 as tf,d2 as Wc,d3 as nf,d4 as Ir,d5 as Dr,d6 as Ur,d7 as af,d8 as sf,d9 as rf,da as of,db as cf,dc as lf,dd as It,de as df}from"./index-CA9quxkw.js";import{progress as ct}from"./progress-ZSyFV5Lf.js";let jn=null;function Nr(){try{(!jn||!jn.isConnected)&&(jn=document.createElement("div"),jn.setAttribute("aria-hidden","true"),jn.style.cssText="position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top,0px);padding-right:env(safe-area-inset-right,0px);padding-bottom:env(safe-area-inset-bottom,0px);padding-left:env(safe-area-inset-left,0px);",document.body.appendChild(jn));const n=getComputedStyle(jn);return{top:parseFloat(n.paddingTop)||0,right:parseFloat(n.paddingRight)||0,bottom:parseFloat(n.paddingBottom)||0,left:parseFloat(n.paddingLeft)||0}}catch{return{top:0,right:0,bottom:0,left:0}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xc(){let n=null,e=!1,t=null,i=null;function s(a,r){t(a,r),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function ff(n){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,d),o.onUploadCallback();let v;if(l instanceof Float32Array)v=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)v=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?v=n.HALF_FLOAT:v=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)v=n.SHORT;else if(l instanceof Uint32Array)v=n.UNSIGNED_INT;else if(l instanceof Int32Array)v=n.INT;else if(l instanceof Int8Array)v=n.BYTE;else if(l instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:v,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){const d=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,d);else{h.sort((v,b)=>v.start-b.start);let u=0;for(let v=1;v<h.length;v++){const b=h[u],S=h[v];S.start<=b.start+b.count+1?b.count=Math.max(b.count,S.start+S.count-b.start):(++u,h[u]=S)}h.length=u+1;for(let v=0,b=h.length;v<b;v++){const S=h[v];n.bufferSubData(l,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:a,update:r}}var uf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_f=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Mf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,yf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,If=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Df=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Uf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Nf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Of=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ff=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Xf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$f=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,eu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,au=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,su=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ru=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ou=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,du=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,hu=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pu=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,mu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_u=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Su=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Eu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Au=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ru=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Iu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Du=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Nu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ou=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ku=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,zu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ku=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ju=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,$u=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Zu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ju=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,eh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,th=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ih=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ah=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sh=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,rh=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,oh=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ch=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,fh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const uh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hh=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ph=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mh=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vh=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_h=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xh=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,bh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mh=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Sh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Eh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Th=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wh=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ah=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rh=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ch=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lh=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ph=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ih=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Dh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Uh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Oh=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Fh=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kh=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zh=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vh=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wh=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:uf,alphahash_pars_fragment:hf,alphamap_fragment:pf,alphamap_pars_fragment:mf,alphatest_fragment:gf,alphatest_pars_fragment:vf,aomap_fragment:_f,aomap_pars_fragment:xf,batching_pars_vertex:bf,batching_vertex:Mf,begin_vertex:Sf,beginnormal_vertex:Ef,bsdfs:Tf,iridescence_fragment:wf,bumpmap_pars_fragment:yf,clipping_planes_fragment:Af,clipping_planes_pars_fragment:Rf,clipping_planes_pars_vertex:Cf,clipping_planes_vertex:Lf,color_fragment:Pf,color_pars_fragment:If,color_pars_vertex:Df,color_vertex:Uf,common:Nf,cube_uv_reflection_fragment:Of,defaultnormal_vertex:Ff,displacementmap_pars_vertex:kf,displacementmap_vertex:Bf,emissivemap_fragment:Gf,emissivemap_pars_fragment:Hf,colorspace_fragment:zf,colorspace_pars_fragment:Vf,envmap_fragment:Wf,envmap_common_pars_fragment:Xf,envmap_pars_fragment:Kf,envmap_pars_vertex:jf,envmap_physical_pars_fragment:au,envmap_vertex:Yf,fog_vertex:$f,fog_pars_vertex:qf,fog_fragment:Zf,fog_pars_fragment:Jf,gradientmap_pars_fragment:Qf,lightmap_pars_fragment:eu,lights_lambert_fragment:tu,lights_lambert_pars_fragment:nu,lights_pars_begin:iu,lights_toon_fragment:su,lights_toon_pars_fragment:ru,lights_phong_fragment:ou,lights_phong_pars_fragment:cu,lights_physical_fragment:lu,lights_physical_pars_fragment:du,lights_fragment_begin:fu,lights_fragment_maps:uu,lights_fragment_end:hu,lightprobes_pars_fragment:pu,logdepthbuf_fragment:mu,logdepthbuf_pars_fragment:gu,logdepthbuf_pars_vertex:vu,logdepthbuf_vertex:_u,map_fragment:xu,map_pars_fragment:bu,map_particle_fragment:Mu,map_particle_pars_fragment:Su,metalnessmap_fragment:Eu,metalnessmap_pars_fragment:Tu,morphinstance_vertex:wu,morphcolor_vertex:yu,morphnormal_vertex:Au,morphtarget_pars_vertex:Ru,morphtarget_vertex:Cu,normal_fragment_begin:Lu,normal_fragment_maps:Pu,normal_pars_fragment:Iu,normal_pars_vertex:Du,normal_vertex:Uu,normalmap_pars_fragment:Nu,clearcoat_normal_fragment_begin:Ou,clearcoat_normal_fragment_maps:Fu,clearcoat_pars_fragment:ku,iridescence_pars_fragment:Bu,opaque_fragment:Gu,packing:Hu,premultiplied_alpha_fragment:zu,project_vertex:Vu,dithering_fragment:Wu,dithering_pars_fragment:Xu,roughnessmap_fragment:Ku,roughnessmap_pars_fragment:ju,shadowmap_pars_fragment:Yu,shadowmap_pars_vertex:$u,shadowmap_vertex:qu,shadowmask_pars_fragment:Zu,skinbase_vertex:Ju,skinning_pars_vertex:Qu,skinning_vertex:eh,skinnormal_vertex:th,specularmap_fragment:nh,specularmap_pars_fragment:ih,tonemapping_fragment:ah,tonemapping_pars_fragment:sh,transmission_fragment:rh,transmission_pars_fragment:oh,uv_pars_fragment:ch,uv_pars_vertex:lh,uv_vertex:dh,worldpos_vertex:fh,background_vert:uh,background_frag:hh,backgroundCube_vert:ph,backgroundCube_frag:mh,cube_vert:gh,cube_frag:vh,depth_vert:_h,depth_frag:xh,distance_vert:bh,distance_frag:Mh,equirect_vert:Sh,equirect_frag:Eh,linedashed_vert:Th,linedashed_frag:wh,meshbasic_vert:yh,meshbasic_frag:Ah,meshlambert_vert:Rh,meshlambert_frag:Ch,meshmatcap_vert:Lh,meshmatcap_frag:Ph,meshnormal_vert:Ih,meshnormal_frag:Dh,meshphong_vert:Uh,meshphong_frag:Nh,meshphysical_vert:Oh,meshphysical_frag:Fh,meshtoon_vert:kh,meshtoon_frag:Bh,points_vert:Gh,points_frag:Hh,shadow_vert:zh,shadow_frag:Vh,sprite_vert:Wh,sprite_frag:Xh},Ee={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new he},probesMax:{value:new he},probesResolution:{value:new he}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Mn={basic:{uniforms:Zt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Zt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Zt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Zt([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Zt([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new Be(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Zt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Zt([Ee.points,Ee.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Zt([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Zt([Ee.common,Ee.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Zt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Zt([Ee.sprite,Ee.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:Zt([Ee.common,Ee.displacementmap,{referencePosition:{value:new he},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:Zt([Ee.lights,Ee.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Mn.physical={uniforms:Zt([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const oa={r:0,b:0,g:0},Kh=new Qt,Kc=new et;Kc.set(-1,0,0,0,1,0,0,0,1);function jh(n,e,t,i,s,a){const r=new Be(0);let o=s===!0?0:1,c,l,d=null,h=0,u=null;function v(E){let y=E.isScene===!0?E.background:null;if(y&&y.isTexture){const _=E.backgroundBlurriness>0;y=e.get(y,_)}return y}function b(E){let y=!1;const _=v(E);_===null?g(r,o):_&&_.isColor&&(g(_,1),y=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(E,y){const _=v(y);_&&(_.isCubeTexture||_.mapping===Da)?(l===void 0&&(l=new ot(new Dn(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:Ms(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,T,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Kh.makeRotationFromEuler(y.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Kc),l.material.toneMapped=Mt.getTransfer(_.colorSpace)!==vt,(d!==_||h!==_.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=_,h=_.version,u=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ot(new Wn(2,2),new wn({name:"BackgroundMaterial",uniforms:Ms(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Mt.getTransfer(_.colorSpace)!==vt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||h!==_.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=_,h=_.version,u=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function g(E,y){E.getRGB(oa,Rc(n)),t.buffers.color.setClear(oa.r,oa.g,oa.b,y,a)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return r},setClearColor:function(E,y=1){r.set(E),o=y,g(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,g(r,o)},render:b,addToRenderList:S,dispose:f}}function Yh(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let a=s,r=!1;function o(O,B,te,$,V){let J=!1;const Y=h(O,$,te,B);a!==Y&&(a=Y,l(a.object)),J=v(O,$,te,V),J&&b(O,$,te,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(J||r)&&(r=!1,_(O,B,te,$),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return n.createVertexArray()}function l(O){return n.bindVertexArray(O)}function d(O){return n.deleteVertexArray(O)}function h(O,B,te,$){const V=$.wireframe===!0;let J=i[B.id];J===void 0&&(J={},i[B.id]=J);const Y=O.isInstancedMesh===!0?O.id:0;let ie=J[Y];ie===void 0&&(ie={},J[Y]=ie);let me=ie[te.id];me===void 0&&(me={},ie[te.id]=me);let fe=me[V];return fe===void 0&&(fe=u(c()),me[V]=fe),fe}function u(O){const B=[],te=[],$=[];for(let V=0;V<t;V++)B[V]=0,te[V]=0,$[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:te,attributeDivisors:$,object:O,attributes:{},index:null}}function v(O,B,te,$){const V=a.attributes,J=B.attributes;let Y=0;const ie=te.getAttributes();for(const me in ie)if(ie[me].location>=0){const Ae=V[me];let De=J[me];if(De===void 0&&(me==="instanceMatrix"&&O.instanceMatrix&&(De=O.instanceMatrix),me==="instanceColor"&&O.instanceColor&&(De=O.instanceColor)),Ae===void 0||Ae.attribute!==De||De&&Ae.data!==De.data)return!0;Y++}return a.attributesNum!==Y||a.index!==$}function b(O,B,te,$){const V={},J=B.attributes;let Y=0;const ie=te.getAttributes();for(const me in ie)if(ie[me].location>=0){let Ae=J[me];Ae===void 0&&(me==="instanceMatrix"&&O.instanceMatrix&&(Ae=O.instanceMatrix),me==="instanceColor"&&O.instanceColor&&(Ae=O.instanceColor));const De={};De.attribute=Ae,Ae&&Ae.data&&(De.data=Ae.data),V[me]=De,Y++}a.attributes=V,a.attributesNum=Y,a.index=$}function S(){const O=a.newAttributes;for(let B=0,te=O.length;B<te;B++)O[B]=0}function g(O){f(O,0)}function f(O,B){const te=a.newAttributes,$=a.enabledAttributes,V=a.attributeDivisors;te[O]=1,$[O]===0&&(n.enableVertexAttribArray(O),$[O]=1),V[O]!==B&&(n.vertexAttribDivisor(O,B),V[O]=B)}function E(){const O=a.newAttributes,B=a.enabledAttributes;for(let te=0,$=B.length;te<$;te++)B[te]!==O[te]&&(n.disableVertexAttribArray(te),B[te]=0)}function y(O,B,te,$,V,J,Y){Y===!0?n.vertexAttribIPointer(O,B,te,V,J):n.vertexAttribPointer(O,B,te,$,V,J)}function _(O,B,te,$){S();const V=$.attributes,J=te.getAttributes(),Y=B.defaultAttributeValues;for(const ie in J){const me=J[ie];if(me.location>=0){let fe=V[ie];if(fe===void 0&&(ie==="instanceMatrix"&&O.instanceMatrix&&(fe=O.instanceMatrix),ie==="instanceColor"&&O.instanceColor&&(fe=O.instanceColor)),fe!==void 0){const Ae=fe.normalized,De=fe.itemSize,dt=e.get(fe);if(dt===void 0)continue;const yt=dt.buffer,nt=dt.type,Q=dt.bytesPerElement,xe=nt===n.INT||nt===n.UNSIGNED_INT||fe.gpuType===yc;if(fe.isInterleavedBufferAttribute){const oe=fe.data,ke=oe.stride,Oe=fe.offset;if(oe.isInstancedInterleavedBuffer){for(let Fe=0;Fe<me.locationSize;Fe++)f(me.location+Fe,oe.meshPerAttribute);O.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Fe=0;Fe<me.locationSize;Fe++)g(me.location+Fe);n.bindBuffer(n.ARRAY_BUFFER,yt);for(let Fe=0;Fe<me.locationSize;Fe++)y(me.location+Fe,De/me.locationSize,nt,Ae,ke*Q,(Oe+De/me.locationSize*Fe)*Q,xe)}else{if(fe.isInstancedBufferAttribute){for(let oe=0;oe<me.locationSize;oe++)f(me.location+oe,fe.meshPerAttribute);O.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let oe=0;oe<me.locationSize;oe++)g(me.location+oe);n.bindBuffer(n.ARRAY_BUFFER,yt);for(let oe=0;oe<me.locationSize;oe++)y(me.location+oe,De/me.locationSize,nt,Ae,De*Q,De/me.locationSize*oe*Q,xe)}}else if(Y!==void 0){const Ae=Y[ie];if(Ae!==void 0)switch(Ae.length){case 2:n.vertexAttrib2fv(me.location,Ae);break;case 3:n.vertexAttrib3fv(me.location,Ae);break;case 4:n.vertexAttrib4fv(me.location,Ae);break;default:n.vertexAttrib1fv(me.location,Ae)}}}}E()}function R(){w();for(const O in i){const B=i[O];for(const te in B){const $=B[te];for(const V in $){const J=$[V];for(const Y in J)d(J[Y].object),delete J[Y];delete $[V]}}delete i[O]}}function T(O){if(i[O.id]===void 0)return;const B=i[O.id];for(const te in B){const $=B[te];for(const V in $){const J=$[V];for(const Y in J)d(J[Y].object),delete J[Y];delete $[V]}}delete i[O.id]}function I(O){for(const B in i){const te=i[B];for(const $ in te){const V=te[$];if(V[O.id]===void 0)continue;const J=V[O.id];for(const Y in J)d(J[Y].object),delete J[Y];delete V[O.id]}}}function x(O){for(const B in i){const te=i[B],$=O.isInstancedMesh===!0?O.id:0,V=te[$];if(V!==void 0){for(const J in V){const Y=V[J];for(const ie in Y)d(Y[ie].object),delete Y[ie];delete V[J]}delete te[$],Object.keys(te).length===0&&delete i[B]}}}function w(){N(),r=!0,a!==s&&(a=s,l(a.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:N,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:I,initAttributes:S,enableAttribute:g,disableUnusedAttributes:E}}function $h(n,e,t){let i;function s(c){i=c}function a(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function r(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),t.update(l,i,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let u=0;for(let v=0;v<d;v++)u+=l[v];t.update(u,i,1)}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o}function qh(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(I){return!(I!==Ln&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){const x=I===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Sn&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Hn&&!x)}function c(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(lt("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&lt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const v=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:v,maxVertexTextures:b,maxTextureSize:S,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:E,maxVaryings:y,maxFragmentUniforms:_,maxSamples:R,samples:T}}function Zh(n){const e=this;let t=null,i=0,s=!1,a=!1;const r=new Zl,o=new et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const v=h.length!==0||u||i!==0||s;return s=u,i=h.length,v},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,v){const b=h.clippingPlanes,S=h.clipIntersection,g=h.clipShadows,f=n.get(h);if(!s||b===null||b.length===0||a&&!g)a?d(null):l();else{const E=a?0:i,y=E*4;let _=f.clippingState||null;c.value=_,_=d(b,u,y,v);for(let R=0;R!==y;++R)_[R]=t[R];f.clippingState=_,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,v,b){const S=h!==null?h.length:0;let g=null;if(S!==0){if(g=c.value,b!==!0||g===null){const f=v+S*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<f)&&(g=new Float32Array(f));for(let y=0,_=v;y!==S;++y,_+=4)r.copy(h[y]).applyMatrix4(E,o),r.normal.toArray(g,_),g[_+3]=r.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,g}}const zn=4,Or=[.125,.215,.35,.446,.526,.582],Qn=20,Jh=256,Ni=new ks,Fr=new Be;let Ya=null,$a=0,qa=0,Za=!1;const Qh=new he;class ws{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,a={}){const{size:r=256,position:o=Qh}=a;Ya=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Br(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ya,$a,qa),this._renderer.xr.enabled=Za,e.scissorTest=!1,ci(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qi||e.mapping===Si?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ya=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:Xn,format:Ln,colorSpace:hn,depthBuffer:!1},s=kr(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kr(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ep(a)),this._blurMaterial=np(a,e,t),this._ggxMaterial=tp(a,e,t)}return s}_compileMaterial(e){const t=new ot(new Ri,e);this._renderer.compile(t,Ni)}_sceneToCubeUV(e,t,i,s,a){const c=new vi(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,v=h.toneMapping;h.getClearColor(Fr),h.toneMapping=En,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ot(new Dn,new Xt({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,g=S.material;let f=!1;const E=e.background;E?E.isColor&&(g.color.copy(E),e.background=null,f=!0):(g.color.copy(Fr),f=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(c.up.set(0,l[y],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+d[y],a.y,a.z)):_===1?(c.up.set(0,0,l[y]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+d[y],a.z)):(c.up.set(0,l[y],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+d[y]));const R=this._cubeSize;ci(s,_*R,y>2?R:0,R,R),h.setRenderTarget(s),f&&h.render(S,c),h.render(e,c)}h.toneMapping=v,h.autoClear=u,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===qi||e.mapping===Si;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gr()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Br());const a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;ci(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(r,Ni)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const c=r.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-d*d),u=0+l*1.25,v=h*u,{_lodMax:b}=this,S=this._sizeLods[i],g=3*S*(i>b-zn?i-b+zn:0),f=4*(this._cubeSize-S);c.envMap.value=e.texture,c.roughness.value=v,c.mipInt.value=b-t,ci(a,g,f,3*S,2*S),s.setRenderTarget(a),s.render(o,Ni),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=b-i,ci(e,g,f,3*S,2*S),s.setRenderTarget(e),s.render(o,Ni)}_blur(e,t,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,s,"latitudinal",a),this._halfBlur(r,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,r,o){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&_t("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[s];h.material=l;const u=l.uniforms,v=this._sizeLods[i]-1,b=isFinite(a)?Math.PI/(2*v):2*Math.PI/(2*Qn-1),S=a/b,g=isFinite(a)?1+Math.floor(d*S):Qn;g>Qn&&lt(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Qn}`);const f=[];let E=0;for(let I=0;I<Qn;++I){const x=I/S,w=Math.exp(-x*x/2);f.push(w),I===0?E+=w:I<g&&(E+=2*w)}for(let I=0;I<f.length;I++)f[I]=f[I]/E;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=b,u.mipInt.value=y-i;const _=this._sizeLods[s],R=3*_*(s>y-zn?s-y+zn:0),T=4*(this._cubeSize-_);ci(t,R,T,3*_,2*_),c.setRenderTarget(t),c.render(h,Ni)}}function ep(n){const e=[],t=[],i=[];let s=n;const a=n-zn+1+Or.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);e.push(o);let c=1/o;r>n-zn?c=Or[r-n+zn-1]:r===0&&(c=0),t.push(c);const l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],v=6,b=6,S=3,g=2,f=1,E=new Float32Array(S*b*v),y=new Float32Array(g*b*v),_=new Float32Array(f*b*v);for(let T=0;T<v;T++){const I=T%3*2/3-1,x=T>2?0:-1,w=[I,x,0,I+2/3,x,0,I+2/3,x+1,0,I,x,0,I+2/3,x+1,0,I,x+1,0];E.set(w,S*b*T),y.set(u,g*b*T);const N=[T,T,T,T,T,T];_.set(N,f*b*T)}const R=new Ri;R.setAttribute("position",new Gt(E,S)),R.setAttribute("uv",new Gt(y,g)),R.setAttribute("faceIndex",new Gt(_,f)),i.push(new ot(R,null)),s>zn&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function kr(n,e,t){const i=new Tn(n,e,t);return i.texture.mapping=Da,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ci(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function tp(n,e,t){return new wn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Jh,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Na(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function np(n,e,t){const i=new Float32Array(Qn),s=new he(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:Qn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function Br(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function Gr(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function Na(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class jc extends Tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Cc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Dn(5,5,5),a=new wn({name:"CubemapFromEquirect",uniforms:Ms(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qt,blending:In});a.uniforms.tEquirect.value=t;const r=new ot(s,a),o=t.minFilter;return t.minFilter===Gn&&(t.minFilter=Kt),new Md(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,s);e.setRenderTarget(a)}}function ip(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,v=!1){return u==null?null:v?r(u):a(u)}function a(u){if(u&&u.isTexture){const v=u.mapping;if(v===Xa||v===Ka)if(e.has(u)){const b=e.get(u).texture;return o(b,u.mapping)}else{const b=u.image;if(b&&b.height>0){const S=new jc(b.height);return S.fromEquirectangularTexture(n,u),e.set(u,S),u.addEventListener("dispose",l),o(S.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const v=u.mapping,b=v===Xa||v===Ka,S=v===qi||v===Si;if(b||S){let g=t.get(u);const f=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new ws(n)),g=b?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const E=u.image;return b&&E&&E.height>0||S&&E&&c(E)?(i===null&&(i=new ws(n)),g=b?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,v){return v===Xa?u.mapping=qi:v===Ka&&(u.mapping=Si),u}function c(u){let v=0;const b=6;for(let S=0;S<b;S++)u[S]!==void 0&&v++;return v===b}function l(u){const v=u.target;v.removeEventListener("dispose",l);const b=e.get(v);b!==void 0&&(e.delete(v),b.dispose())}function d(u){const v=u.target;v.removeEventListener("dispose",d);const b=t.get(v);b!==void 0&&(t.delete(v),b.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function ap(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Al("WebGLRenderer: "+i+" extension not supported."),s}}}function sp(n,e,t,i){const s={},a=new WeakMap;function r(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const b in u.attributes)e.remove(u.attributes[b]);u.removeEventListener("dispose",r),delete s[u.id];const v=a.get(u);v&&(e.remove(v),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,t.memory.geometries++),u}function c(h){const u=h.attributes;for(const v in u)e.update(u[v],n.ARRAY_BUFFER)}function l(h){const u=[],v=h.index,b=h.attributes.position;let S=0;if(b===void 0)return;if(v!==null){const E=v.array;S=v.version;for(let y=0,_=E.length;y<_;y+=3){const R=E[y+0],T=E[y+1],I=E[y+2];u.push(R,T,T,I,I,R)}}else{const E=b.array;S=b.version;for(let y=0,_=E.length/3-1;y<_;y+=3){const R=y+0,T=y+1,I=y+2;u.push(R,T,T,I,I,R)}}const g=new(b.count>=65535?Sd:Ed)(u,1);g.version=S;const f=a.get(h);f&&e.remove(f),a.set(h,g)}function d(h){const u=a.get(h);if(u){const v=h.index;v!==null&&u.version<v.version&&l(h)}else l(h);return a.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function rp(n,e,t){let i;function s(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function c(h,u){n.drawElements(i,u,a,h*r),t.update(u,i,1)}function l(h,u,v){v!==0&&(n.drawElementsInstanced(i,u,a,h*r,v),t.update(u,i,v))}function d(h,u,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,h,0,v);let S=0;for(let g=0;g<v;g++)S+=u[g];t.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function op(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:_t("WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function cp(n,e,t){const i=new WeakMap,s=new Jt;function a(r,o,c){const l=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let w=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const v=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let y=0;v===!0&&(y=1),b===!0&&(y=2),S===!0&&(y=3);let _=o.attributes.position.count*y,R=1;_>e.maxTextureSize&&(R=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const T=new Float32Array(_*R*4*h),I=new Ac(T,_,R,h);I.type=Hn,I.needsUpdate=!0;const x=y*4;for(let N=0;N<h;N++){const O=g[N],B=f[N],te=E[N],$=_*R*4*N;for(let V=0;V<O.count;V++){const J=V*x;v===!0&&(s.fromBufferAttribute(O,V),T[$+J+0]=s.x,T[$+J+1]=s.y,T[$+J+2]=s.z,T[$+J+3]=0),b===!0&&(s.fromBufferAttribute(B,V),T[$+J+4]=s.x,T[$+J+5]=s.y,T[$+J+6]=s.z,T[$+J+7]=0),S===!0&&(s.fromBufferAttribute(te,V),T[$+J+8]=s.x,T[$+J+9]=s.y,T[$+J+10]=s.z,T[$+J+11]=te.itemSize===4?s.w:1)}}u={count:h,texture:I,size:new Ut(_,R)},i.set(o,u),o.addEventListener("dispose",w)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let v=0;for(let S=0;S<l.length;S++)v+=l[S];const b=o.morphTargetsRelative?1:1-v;c.getUniforms().setValue(n,"morphTargetBaseInfluence",b),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:a}}function lp(n,e,t,i,s){let a=new WeakMap;function r(l){const d=s.render.frame,h=l.geometry,u=e.get(l,h);if(a.get(u)!==d&&(e.update(u),a.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),a.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,d))),l.isSkinnedMesh){const v=l.skeleton;a.get(v)!==d&&(v.update(),a.set(v,d))}return u}function o(){a=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:r,dispose:o}}const dp={[Nc]:"LINEAR_TONE_MAPPING",[Uc]:"REINHARD_TONE_MAPPING",[Dc]:"CINEON_TONE_MAPPING",[Ic]:"ACES_FILMIC_TONE_MAPPING",[Pc]:"AGX_TONE_MAPPING",[Hs]:"NEUTRAL_TONE_MAPPING",[Lc]:"CUSTOM_TONE_MAPPING"};function fp(n,e,t,i,s,a){const r=new Tn(e,t,{type:n,depthBuffer:s,stencilBuffer:a,samples:i?4:0,depthTexture:s?new Zi(e,t):void 0}),o=new Tn(e,t,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),c=new Ri;c.setAttribute("position",new Ys([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ys([0,2,0,0,2,0],2));const l=new Sl({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ot(c,l),h=new ks(-1,1,1,-1,0,1);let u=null,v=null,b=!1,S,g=null,f=[],E=!1;this.setSize=function(y,_){r.setSize(y,_),o.setSize(y,_);for(let R=0;R<f.length;R++){const T=f[R];T.setSize&&T.setSize(y,_)}},this.setEffects=function(y){f=y,E=f.length>0&&f[0].isRenderPass===!0;const _=r.width,R=r.height;for(let T=0;T<f.length;T++){const I=f[T];I.setSize&&I.setSize(_,R)}},this.begin=function(y,_){if(b||y.toneMapping===En&&f.length===0)return!1;if(g=_,_!==null){const R=_.width,T=_.height;(r.width!==R||r.height!==T)&&this.setSize(R,T)}return E===!1&&y.setRenderTarget(r),S=y.toneMapping,y.toneMapping=En,!0},this.hasRenderPass=function(){return E},this.end=function(y,_){y.toneMapping=S,b=!0;let R=r,T=o;for(let I=0;I<f.length;I++){const x=f[I];if(x.enabled!==!1&&(x.render(y,T,R,_),x.needsSwap!==!1)){const w=R;R=T,T=w}}if(u!==y.outputColorSpace||v!==y.toneMapping){u=y.outputColorSpace,v=y.toneMapping,l.defines={},Mt.getTransfer(u)===vt&&(l.defines.SRGB_TRANSFER="");const I=dp[v];I&&(l.defines[I]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=R.texture,y.setRenderTarget(g),y.render(d,h),g=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Yc=new Ra,ys=new Zi(1,1),$c=new Ac,qc=new wd,Zc=new Cc,Hr=[],zr=[],Vr=new Float32Array(16),Wr=new Float32Array(9),Xr=new Float32Array(4);function Ci(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=Hr[s];if(a===void 0&&(a=new Float32Array(s),Hr[s]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(a,o)}return a}function Ot(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Oa(n,e){let t=zr[e];t===void 0&&(t=new Int32Array(e),zr[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function up(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function hp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2fv(this.addr,e),Ft(t,e)}}function pp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;n.uniform3fv(this.addr,e),Ft(t,e)}}function mp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4fv(this.addr,e),Ft(t,e)}}function gp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Ot(t,i))return;Xr.set(i),n.uniformMatrix2fv(this.addr,!1,Xr),Ft(t,i)}}function vp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Ot(t,i))return;Wr.set(i),n.uniformMatrix3fv(this.addr,!1,Wr),Ft(t,i)}}function _p(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Ot(t,i))return;Vr.set(i),n.uniformMatrix4fv(this.addr,!1,Vr),Ft(t,i)}}function xp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function bp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2iv(this.addr,e),Ft(t,e)}}function Mp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3iv(this.addr,e),Ft(t,e)}}function Sp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4iv(this.addr,e),Ft(t,e)}}function Ep(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Tp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2uiv(this.addr,e),Ft(t,e)}}function wp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3uiv(this.addr,e),Ft(t,e)}}function yp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4uiv(this.addr,e),Ft(t,e)}}function Ap(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(ys.compareFunction=t.isReversedDepthBuffer()?Bs:Gs,a=ys):a=Yc,t.setTexture2D(e||a,s)}function Rp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||qc,s)}function Cp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Zc,s)}function Lp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||$c,s)}function Pp(n){switch(n){case 5126:return up;case 35664:return hp;case 35665:return pp;case 35666:return mp;case 35674:return gp;case 35675:return vp;case 35676:return _p;case 5124:case 35670:return xp;case 35667:case 35671:return bp;case 35668:case 35672:return Mp;case 35669:case 35673:return Sp;case 5125:return Ep;case 36294:return Tp;case 36295:return wp;case 36296:return yp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ap;case 35679:case 36299:case 36307:return Rp;case 35680:case 36300:case 36308:case 36293:return Cp;case 36289:case 36303:case 36311:case 36292:return Lp}}function Ip(n,e){n.uniform1fv(this.addr,e)}function Dp(n,e){const t=Ci(e,this.size,2);n.uniform2fv(this.addr,t)}function Up(n,e){const t=Ci(e,this.size,3);n.uniform3fv(this.addr,t)}function Np(n,e){const t=Ci(e,this.size,4);n.uniform4fv(this.addr,t)}function Op(n,e){const t=Ci(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Fp(n,e){const t=Ci(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function kp(n,e){const t=Ci(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Bp(n,e){n.uniform1iv(this.addr,e)}function Gp(n,e){n.uniform2iv(this.addr,e)}function Hp(n,e){n.uniform3iv(this.addr,e)}function zp(n,e){n.uniform4iv(this.addr,e)}function Vp(n,e){n.uniform1uiv(this.addr,e)}function Wp(n,e){n.uniform2uiv(this.addr,e)}function Xp(n,e){n.uniform3uiv(this.addr,e)}function Kp(n,e){n.uniform4uiv(this.addr,e)}function jp(n,e,t){const i=this.cache,s=e.length,a=Oa(t,s);Ot(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));let r;this.type===n.SAMPLER_2D_SHADOW?r=ys:r=Yc;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||r,a[o])}function Yp(n,e,t){const i=this.cache,s=e.length,a=Oa(t,s);Ot(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||qc,a[r])}function $p(n,e,t){const i=this.cache,s=e.length,a=Oa(t,s);Ot(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||Zc,a[r])}function qp(n,e,t){const i=this.cache,s=e.length,a=Oa(t,s);Ot(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||$c,a[r])}function Zp(n){switch(n){case 5126:return Ip;case 35664:return Dp;case 35665:return Up;case 35666:return Np;case 35674:return Op;case 35675:return Fp;case 35676:return kp;case 5124:case 35670:return Bp;case 35667:case 35671:return Gp;case 35668:case 35672:return Hp;case 35669:case 35673:return zp;case 5125:return Vp;case 36294:return Wp;case 36295:return Xp;case 36296:return Kp;case 35678:case 36198:case 36298:case 36306:case 35682:return jp;case 35679:case 36299:case 36307:return Yp;case 35680:case 36300:case 36308:case 36293:return $p;case 36289:case 36303:case 36311:case 36292:return qp}}class Jp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Pp(t.type)}}class Qp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zp(t.type)}}class em{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const Ja=/(\w+)(\])?(\[|\.)?/g;function Kr(n,e){n.seq.push(e),n.map[e.id]=e}function tm(n,e,t){const i=n.name,s=i.length;for(Ja.lastIndex=0;;){const a=Ja.exec(i),r=Ja.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&r+2===s){Kr(t,l===void 0?new Jp(o,n,e):new Qp(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new em(o),Kr(t,h)),t=h}}}class Ma{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(t,r),c=e.getUniformLocation(t,o.name);tm(o,c,this)}const s=[],a=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&i.push(r)}return i}}function jr(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const nm=37297;let im=0;function am(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const Yr=new et;function sm(n){Mt._getMatrix(Yr,Mt.workingColorSpace,n);const e=`mat3( ${Yr.elements.map(t=>t.toFixed(4))} )`;switch(Mt.getTransfer(n)){case Oc:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return lt("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function $r(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+am(n.getShaderSource(e),o)}else return a}function rm(n,e){const t=sm(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const om={[Nc]:"Linear",[Uc]:"Reinhard",[Dc]:"Cineon",[Ic]:"ACESFilmic",[Pc]:"AgX",[Hs]:"Neutral",[Lc]:"Custom"};function cm(n,e){const t=om[e];return t===void 0?(lt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ca=new he;function lm(){Mt.getLuminanceCoefficients(ca);const n=ca.x.toFixed(4),e=ca.y.toFixed(4),t=ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wi).join(`
`)}function fm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function um(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function Wi(n){return n!==""}function qr(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zr(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const hm=/^[ \t]*#include +<([\w\d./]+)>/gm;function As(n){return n.replace(hm,mm)}const pm=new Map;function mm(n,e){let t=je[e];if(t===void 0){const i=pm.get(e);if(i!==void 0)t=je[i],lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return As(t)}const gm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jr(n){return n.replace(gm,vm)}function vm(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Qr(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const _m={[Ki]:"SHADOWMAP_TYPE_PCF",[Vi]:"SHADOWMAP_TYPE_VSM"};function xm(n){return _m[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const bm={[qi]:"ENVMAP_TYPE_CUBE",[Si]:"ENVMAP_TYPE_CUBE",[Da]:"ENVMAP_TYPE_CUBE_UV"};function Mm(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":bm[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Sm={[Si]:"ENVMAP_MODE_REFRACTION"};function Em(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Sm[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Tm={[Cd]:"ENVMAP_BLENDING_MULTIPLY",[Rd]:"ENVMAP_BLENDING_MIX",[Ad]:"ENVMAP_BLENDING_ADD"};function wm(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Tm[n.combine]||"ENVMAP_BLENDING_NONE"}function ym(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Am(n,e,t,i){const s=n.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const c=xm(t),l=Mm(t),d=Em(t),h=wm(t),u=ym(t),v=dm(t),b=fm(a),S=s.createProgram();let g,f,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Wi).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Wi).join(`
`),f.length>0&&(f+=`
`)):(g=[Qr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wi).join(`
`),f=[Qr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==En?"#define TONE_MAPPING":"",t.toneMapping!==En?je.tonemapping_pars_fragment:"",t.toneMapping!==En?cm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,rm("linearToOutputTexel",t.outputColorSpace),lm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wi).join(`
`)),r=As(r),r=qr(r,t),r=Zr(r,t),o=As(o),o=qr(o,t),o=Zr(o,t),r=Jr(r),o=Jr(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Pr?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=E+g+r,_=E+f+o,R=jr(s,s.VERTEX_SHADER,y),T=jr(s,s.FRAGMENT_SHADER,_);s.attachShader(S,R),s.attachShader(S,T),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function I(O){if(n.debug.checkShaderErrors){const B=s.getProgramInfoLog(S)||"",te=s.getShaderInfoLog(R)||"",$=s.getShaderInfoLog(T)||"",V=B.trim(),J=te.trim(),Y=$.trim();let ie=!0,me=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(ie=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,R,T);else{const fe=$r(s,R,"vertex"),Ae=$r(s,T,"fragment");_t("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+V+`
`+fe+`
`+Ae)}else V!==""?lt("WebGLProgram: Program Info Log:",V):(J===""||Y==="")&&(me=!1);me&&(O.diagnostics={runnable:ie,programLog:V,vertexShader:{log:J,prefix:g},fragmentShader:{log:Y,prefix:f}})}s.deleteShader(R),s.deleteShader(T),x=new Ma(s,S),w=um(s,S)}let x;this.getUniforms=function(){return x===void 0&&I(this),x};let w;this.getAttributes=function(){return w===void 0&&I(this),w};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(S,nm)),N},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=im++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=R,this.fragmentShader=T,this}let Rm=0;class Cm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Lm(e),t.set(e,i)),i}}class Lm{constructor(e){this.id=Rm++,this.code=e,this.usedTimes=0}}function Pm(n){return n===Ti||n===_s||n===xs}function Im(n,e,t,i,s,a){const r=new Td,o=new Cm,c=new Set,l=[],d=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(x){return c.add(x),x===0?"uv":`uv${x}`}function S(x,w,N,O,B,te){const $=O.fog,V=B.geometry,J=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?O.environment:null,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ie=e.get(x.envMap||J,Y),me=ie&&ie.mapping===Da?ie.image.height:null,fe=v[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&lt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const Ae=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,De=Ae!==void 0?Ae.length:0;let dt=0;V.morphAttributes.position!==void 0&&(dt=1),V.morphAttributes.normal!==void 0&&(dt=2),V.morphAttributes.color!==void 0&&(dt=3);let yt,nt,Q,xe;if(fe){const Le=Mn[fe];yt=Le.vertexShader,nt=Le.fragmentShader}else{yt=x.vertexShader,nt=x.fragmentShader;const Le=o.getVertexShaderStage(x),wt=o.getFragmentShaderStage(x);o.update(x,Le,wt),Q=Le.id,xe=wt.id}const oe=n.getRenderTarget(),ke=n.state.buffers.depth.getReversed(),Oe=B.isInstancedMesh===!0,Fe=B.isBatchedMesh===!0,ht=!!x.map,Re=!!x.matcap,Je=!!ie,ze=!!x.aoMap,Ye=!!x.lightMap,St=!!x.bumpMap&&x.wireframe===!1,xt=!!x.normalMap,At=!!x.displacementMap,Rt=!!x.emissiveMap,pt=!!x.metalnessMap,Et=!!x.roughnessMap,P=x.anisotropy>0,Tt=x.clearcoat>0,We=x.dispersion>0,M=x.iridescence>0,m=x.sheen>0,F=x.transmission>0,H=P&&!!x.anisotropyMap,W=Tt&&!!x.clearcoatMap,le=Tt&&!!x.clearcoatNormalMap,ve=Tt&&!!x.clearcoatRoughnessMap,K=M&&!!x.iridescenceMap,Z=M&&!!x.iridescenceThicknessMap,de=m&&!!x.sheenColorMap,Pe=m&&!!x.sheenRoughnessMap,ge=!!x.specularMap,pe=!!x.specularColorMap,Ue=!!x.specularIntensityMap,Ne=F&&!!x.transmissionMap,Ge=F&&!!x.thicknessMap,L=!!x.gradientMap,ue=!!x.alphaMap,q=x.alphaTest>0,be=!!x.alphaHash,Se=!!x.extensions;let ae=En;x.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(ae=n.toneMapping);const Ce={shaderID:fe,shaderType:x.type,shaderName:x.name,vertexShader:yt,fragmentShader:nt,defines:x.defines,customVertexShaderID:Q,customFragmentShaderID:xe,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Fe,batchingColor:Fe&&B._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&B.instanceColor!==null,instancingMorph:Oe&&B.morphTexture!==null,outputColorSpace:oe===null?n.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Mt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ht,matcap:Re,envMap:Je,envMapMode:Je&&ie.mapping,envMapCubeUVHeight:me,aoMap:ze,lightMap:Ye,bumpMap:St,normalMap:xt,displacementMap:At,emissiveMap:Rt,normalMapObjectSpace:xt&&x.normalMapType===bd,normalMapTangentSpace:xt&&x.normalMapType===Cr,packedNormalMap:xt&&x.normalMapType===Cr&&Pm(x.normalMap.format),metalnessMap:pt,roughnessMap:Et,anisotropy:P,anisotropyMap:H,clearcoat:Tt,clearcoatMap:W,clearcoatNormalMap:le,clearcoatRoughnessMap:ve,dispersion:We,iridescence:M,iridescenceMap:K,iridescenceThicknessMap:Z,sheen:m,sheenColorMap:de,sheenRoughnessMap:Pe,specularMap:ge,specularColorMap:pe,specularIntensityMap:Ue,transmission:F,transmissionMap:Ne,thicknessMap:Ge,gradientMap:L,opaque:x.transparent===!1&&x.blending===ji&&x.alphaToCoverage===!1,alphaMap:ue,alphaTest:q,alphaHash:be,combine:x.combine,mapUv:ht&&b(x.map.channel),aoMapUv:ze&&b(x.aoMap.channel),lightMapUv:Ye&&b(x.lightMap.channel),bumpMapUv:St&&b(x.bumpMap.channel),normalMapUv:xt&&b(x.normalMap.channel),displacementMapUv:At&&b(x.displacementMap.channel),emissiveMapUv:Rt&&b(x.emissiveMap.channel),metalnessMapUv:pt&&b(x.metalnessMap.channel),roughnessMapUv:Et&&b(x.roughnessMap.channel),anisotropyMapUv:H&&b(x.anisotropyMap.channel),clearcoatMapUv:W&&b(x.clearcoatMap.channel),clearcoatNormalMapUv:le&&b(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&b(x.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&b(x.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&b(x.iridescenceThicknessMap.channel),sheenColorMapUv:de&&b(x.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&b(x.sheenRoughnessMap.channel),specularMapUv:ge&&b(x.specularMap.channel),specularColorMapUv:pe&&b(x.specularColorMap.channel),specularIntensityMapUv:Ue&&b(x.specularIntensityMap.channel),transmissionMapUv:Ne&&b(x.transmissionMap.channel),thicknessMapUv:Ge&&b(x.thicknessMap.channel),alphaMapUv:ue&&b(x.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(xt||P),vertexNormals:!!V.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!V.attributes.uv&&(ht||ue),fog:!!$,useFog:x.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||V.attributes.normal===void 0&&xt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ke,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:dt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:te.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:ae,decodeVideoTexture:ht&&x.map.isVideoTexture===!0&&Mt.getTransfer(x.map.colorSpace)===vt,decodeVideoTextureEmissive:Rt&&x.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(x.emissiveMap.colorSpace)===vt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ln,flipSided:x.side===qt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Se&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&x.extensions.multiDraw===!0||Fe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function g(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const N in x.defines)w.push(N),w.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(f(w,x),E(w,x),w.push(n.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function E(x,w){r.disableAll(),w.instancing&&r.enable(0),w.instancingColor&&r.enable(1),w.instancingMorph&&r.enable(2),w.matcap&&r.enable(3),w.envMap&&r.enable(4),w.normalMapObjectSpace&&r.enable(5),w.normalMapTangentSpace&&r.enable(6),w.clearcoat&&r.enable(7),w.iridescence&&r.enable(8),w.alphaTest&&r.enable(9),w.vertexColors&&r.enable(10),w.vertexAlphas&&r.enable(11),w.vertexUv1s&&r.enable(12),w.vertexUv2s&&r.enable(13),w.vertexUv3s&&r.enable(14),w.vertexTangents&&r.enable(15),w.anisotropy&&r.enable(16),w.alphaHash&&r.enable(17),w.batching&&r.enable(18),w.dispersion&&r.enable(19),w.batchingColor&&r.enable(20),w.gradientMap&&r.enable(21),w.packedNormalMap&&r.enable(22),w.vertexNormals&&r.enable(23),x.push(r.mask),r.disableAll(),w.fog&&r.enable(0),w.useFog&&r.enable(1),w.flatShading&&r.enable(2),w.logarithmicDepthBuffer&&r.enable(3),w.reversedDepthBuffer&&r.enable(4),w.skinning&&r.enable(5),w.morphTargets&&r.enable(6),w.morphNormals&&r.enable(7),w.morphColors&&r.enable(8),w.premultipliedAlpha&&r.enable(9),w.shadowMapEnabled&&r.enable(10),w.doubleSided&&r.enable(11),w.flipSided&&r.enable(12),w.useDepthPacking&&r.enable(13),w.dithering&&r.enable(14),w.transmission&&r.enable(15),w.sheen&&r.enable(16),w.opaque&&r.enable(17),w.pointsUvs&&r.enable(18),w.decodeVideoTexture&&r.enable(19),w.decodeVideoTextureEmissive&&r.enable(20),w.alphaToCoverage&&r.enable(21),w.numLightProbeGrids>0&&r.enable(22),w.hasPositionAttribute&&r.enable(23),x.push(r.mask)}function y(x){const w=v[x.type];let N;if(w){const O=Mn[w];N=xd.clone(O.uniforms)}else N=x.uniforms;return N}function _(x,w){let N=d.get(w);return N!==void 0?++N.usedTimes:(N=new Am(n,w,x,s),l.push(N),d.set(w,N)),N}function R(x){if(--x.usedTimes===0){const w=l.indexOf(x);l[w]=l[l.length-1],l.pop(),d.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function I(){o.dispose()}return{getParameters:S,getProgramCacheKey:g,getUniforms:y,acquireProgram:_,releaseProgram:R,releaseShaderCache:T,programs:l,dispose:I}}function Dm(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function s(r,o,c){n.get(r)[o]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function Um(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function eo(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function to(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function r(u){let v=0;return u.isInstancedMesh&&(v+=2),u.isSkinnedMesh&&(v+=1),v}function o(u,v,b,S,g,f){let E=n[e];return E===void 0?(E={id:u.id,object:u,geometry:v,material:b,materialVariant:r(u),groupOrder:S,renderOrder:u.renderOrder,z:g,group:f},n[e]=E):(E.id=u.id,E.object=u,E.geometry=v,E.material=b,E.materialVariant=r(u),E.groupOrder=S,E.renderOrder=u.renderOrder,E.z=g,E.group=f),e++,E}function c(u,v,b,S,g,f){const E=o(u,v,b,S,g,f);b.transmission>0?i.push(E):b.transparent===!0?s.push(E):t.push(E)}function l(u,v,b,S,g,f){const E=o(u,v,b,S,g,f);b.transmission>0?i.unshift(E):b.transparent===!0?s.unshift(E):t.unshift(E)}function d(u,v,b){t.length>1&&t.sort(u||Um),i.length>1&&i.sort(v||eo),s.length>1&&s.sort(v||eo),b&&(t.reverse(),i.reverse(),s.reverse())}function h(){for(let u=e,v=n.length;u<v;u++){const b=n[u];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:c,unshift:l,finish:h,sort:d}}function Nm(){let n=new WeakMap;function e(i,s){const a=n.get(i);let r;return a===void 0?(r=new to,n.set(i,[r])):s>=a.length?(r=new to,a.push(r)):r=a[s],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function Om(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new he,color:new Be};break;case"SpotLight":t={position:new he,direction:new he,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new he,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new he,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new he,halfWidth:new he,halfHeight:new he};break}return n[e.id]=t,t}}}function Fm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let km=0;function Bm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Gm(n){const e=new Om,t=Fm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new he);const s=new he,a=new Qt,r=new Qt;function o(l){let d=0,h=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let v=0,b=0,S=0,g=0,f=0,E=0,y=0,_=0,R=0,T=0,I=0;l.sort(Bm);for(let w=0,N=l.length;w<N;w++){const O=l[w],B=O.color,te=O.intensity,$=O.distance;let V=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===Ti?V=O.shadow.map.texture:V=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)d+=B.r*te,h+=B.g*te,u+=B.b*te;else if(O.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(O.sh.coefficients[J],te);I++}else if(O.isDirectionalLight){const J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const Y=O.shadow,ie=t.get(O);ie.shadowIntensity=Y.intensity,ie.shadowBias=Y.bias,ie.shadowNormalBias=Y.normalBias,ie.shadowRadius=Y.radius,ie.shadowMapSize=Y.mapSize,i.directionalShadow[v]=ie,i.directionalShadowMap[v]=V,i.directionalShadowMatrix[v]=O.shadow.matrix,E++}i.directional[v]=J,v++}else if(O.isSpotLight){const J=e.get(O);J.position.setFromMatrixPosition(O.matrixWorld),J.color.copy(B).multiplyScalar(te),J.distance=$,J.coneCos=Math.cos(O.angle),J.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),J.decay=O.decay,i.spot[S]=J;const Y=O.shadow;if(O.map&&(i.spotLightMap[R]=O.map,R++,Y.updateMatrices(O),O.castShadow&&T++),i.spotLightMatrix[S]=Y.matrix,O.castShadow){const ie=t.get(O);ie.shadowIntensity=Y.intensity,ie.shadowBias=Y.bias,ie.shadowNormalBias=Y.normalBias,ie.shadowRadius=Y.radius,ie.shadowMapSize=Y.mapSize,i.spotShadow[S]=ie,i.spotShadowMap[S]=V,_++}S++}else if(O.isRectAreaLight){const J=e.get(O);J.color.copy(B).multiplyScalar(te),J.halfWidth.set(O.width*.5,0,0),J.halfHeight.set(0,O.height*.5,0),i.rectArea[g]=J,g++}else if(O.isPointLight){const J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity),J.distance=O.distance,J.decay=O.decay,O.castShadow){const Y=O.shadow,ie=t.get(O);ie.shadowIntensity=Y.intensity,ie.shadowBias=Y.bias,ie.shadowNormalBias=Y.normalBias,ie.shadowRadius=Y.radius,ie.shadowMapSize=Y.mapSize,ie.shadowCameraNear=Y.camera.near,ie.shadowCameraFar=Y.camera.far,i.pointShadow[b]=ie,i.pointShadowMap[b]=V,i.pointShadowMatrix[b]=O.shadow.matrix,y++}i.point[b]=J,b++}else if(O.isHemisphereLight){const J=e.get(O);J.skyColor.copy(O.color).multiplyScalar(te),J.groundColor.copy(O.groundColor).multiplyScalar(te),i.hemi[f]=J,f++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const x=i.hash;(x.directionalLength!==v||x.pointLength!==b||x.spotLength!==S||x.rectAreaLength!==g||x.hemiLength!==f||x.numDirectionalShadows!==E||x.numPointShadows!==y||x.numSpotShadows!==_||x.numSpotMaps!==R||x.numLightProbes!==I)&&(i.directional.length=v,i.spot.length=S,i.rectArea.length=g,i.point.length=b,i.hemi.length=f,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=_+R-T,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=I,x.directionalLength=v,x.pointLength=b,x.spotLength=S,x.rectAreaLength=g,x.hemiLength=f,x.numDirectionalShadows=E,x.numPointShadows=y,x.numSpotShadows=_,x.numSpotMaps=R,x.numLightProbes=I,i.version=km++)}function c(l,d){let h=0,u=0,v=0,b=0,S=0;const g=d.matrixWorldInverse;for(let f=0,E=l.length;f<E;f++){const y=l[f];if(y.isDirectionalLight){const _=i.directional[h];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),h++}else if(y.isSpotLight){const _=i.spot[v];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),v++}else if(y.isRectAreaLight){const _=i.rectArea[b];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),r.identity(),a.copy(y.matrixWorld),a.premultiply(g),r.extractRotation(a),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(r),_.halfHeight.applyMatrix4(r),b++}else if(y.isPointLight){const _=i.point[u];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),u++}else if(y.isHemisphereLight){const _=i.hemi[S];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(g),S++}}}return{setup:o,setupView:c,state:i}}function no(n){const e=new Gm(n),t=[],i=[],s=[];function a(u){h.camera=u,t.length=0,i.length=0,s.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function d(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:h,setupLights:l,setupLightsView:d,pushLight:r,pushShadow:o,pushLightProbeGrid:c}}function Hm(n){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new no(n),e.set(s,[o])):a>=r.length?(o=new no(n),r.push(o)):o=r[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const zm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Wm=[new he(1,0,0),new he(-1,0,0),new he(0,1,0),new he(0,-1,0),new he(0,0,1),new he(0,0,-1)],Xm=[new he(0,-1,0),new he(0,-1,0),new he(0,0,1),new he(0,0,-1),new he(0,-1,0),new he(0,-1,0)],io=new Qt,Oi=new he,Qa=new he;function Km(n,e,t){let i=new vc;const s=new Ut,a=new Ut,r=new Jt,o=new Jl,c=new Ql,l={},d=t.maxTextureSize,h={[Mi]:qt,[qt]:Mi,[ln]:ln},u=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:zm,fragmentShader:Vm}),v=u.clone();v.defines.HORIZONTAL_PASS=1;const b=new Ri;b.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new ot(b,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ki;let f=this.type;this.render=function(T,I,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===ed&&(lt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ki);const w=n.getRenderTarget(),N=n.getActiveCubeFace(),O=n.getActiveMipmapLevel(),B=n.state;B.setBlending(In),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const te=f!==this.type;te&&I.traverse(function($){$.material&&(Array.isArray($.material)?$.material.forEach(V=>V.needsUpdate=!0):$.material.needsUpdate=!0)});for(let $=0,V=T.length;$<V;$++){const J=T[$],Y=J.shadow;if(Y===void 0){lt("WebGLShadowMap:",J,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ie=Y.getFrameExtents();s.multiply(ie),a.copy(Y.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(a.x=Math.floor(d/ie.x),s.x=a.x*ie.x,Y.mapSize.x=a.x),s.y>d&&(a.y=Math.floor(d/ie.y),s.y=a.y*ie.y,Y.mapSize.y=a.y));const me=n.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=me,Y.map===null||te===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Vi){if(J.isPointLight){lt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new Tn(s.x,s.y,{format:Ti,type:Xn,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),Y.map.texture.name=J.name+".shadowMap",Y.map.depthTexture=new Zi(s.x,s.y,Hn),Y.map.depthTexture.name=J.name+".shadowMapDepth",Y.map.depthTexture.format=Ei,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Pn,Y.map.depthTexture.magFilter=Pn}else J.isPointLight?(Y.map=new jc(s.x),Y.map.depthTexture=new td(s.x,ni)):(Y.map=new Tn(s.x,s.y),Y.map.depthTexture=new Zi(s.x,s.y,ni)),Y.map.depthTexture.name=J.name+".shadowMap",Y.map.depthTexture.format=Ei,this.type===Ki?(Y.map.depthTexture.compareFunction=me?Bs:Gs,Y.map.depthTexture.minFilter=Kt,Y.map.depthTexture.magFilter=Kt):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Pn,Y.map.depthTexture.magFilter=Pn);Y.camera.updateProjectionMatrix()}const fe=Y.map.isWebGLCubeRenderTarget?6:1;for(let Ae=0;Ae<fe;Ae++){if(Y.map.isWebGLCubeRenderTarget)n.setRenderTarget(Y.map,Ae),n.clear();else{Ae===0&&(n.setRenderTarget(Y.map),n.clear());const De=Y.getViewport(Ae);r.set(a.x*De.x,a.y*De.y,a.x*De.z,a.y*De.w),B.viewport(r)}if(J.isPointLight){const De=Y.camera,dt=Y.matrix,yt=J.distance||De.far;yt!==De.far&&(De.far=yt,De.updateProjectionMatrix()),Oi.setFromMatrixPosition(J.matrixWorld),De.position.copy(Oi),Qa.copy(De.position),Qa.add(Wm[Ae]),De.up.copy(Xm[Ae]),De.lookAt(Qa),De.updateMatrixWorld(),dt.makeTranslation(-Oi.x,-Oi.y,-Oi.z),io.multiplyMatrices(De.projectionMatrix,De.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(io,De.coordinateSystem,De.reversedDepth)}else Y.updateMatrices(J);i=Y.getFrustum(),_(I,x,Y.camera,J,this.type)}Y.isPointLightShadow!==!0&&this.type===Vi&&E(Y,x),Y.needsUpdate=!1}f=this.type,g.needsUpdate=!1,n.setRenderTarget(w,N,O)};function E(T,I){const x=e.update(S);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,v.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,v.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Tn(s.x,s.y,{format:Ti,type:Xn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(I,null,x,u,S,null),v.uniforms.shadow_pass.value=T.mapPass.texture,v.uniforms.resolution.value=T.mapSize,v.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(I,null,x,v,S,null)}function y(T,I,x,w){let N=null;const O=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(O!==void 0)N=O;else if(N=x.isPointLight===!0?c:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const B=N.uuid,te=I.uuid;let $=l[B];$===void 0&&($={},l[B]=$);let V=$[te];V===void 0&&(V=N.clone(),$[te]=V,I.addEventListener("dispose",R)),N=V}if(N.visible=I.visible,N.wireframe=I.wireframe,w===Vi?N.side=I.shadowSide!==null?I.shadowSide:I.side:N.side=I.shadowSide!==null?I.shadowSide:h[I.side],N.alphaMap=I.alphaMap,N.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,N.map=I.map,N.clipShadows=I.clipShadows,N.clippingPlanes=I.clippingPlanes,N.clipIntersection=I.clipIntersection,N.displacementMap=I.displacementMap,N.displacementScale=I.displacementScale,N.displacementBias=I.displacementBias,N.wireframeLinewidth=I.wireframeLinewidth,N.linewidth=I.linewidth,x.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const B=n.properties.get(N);B.light=x}return N}function _(T,I,x,w,N){if(T.visible===!1)return;if(T.layers.test(I.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&N===Vi)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const te=e.update(T),$=T.material;if(Array.isArray($)){const V=te.groups;for(let J=0,Y=V.length;J<Y;J++){const ie=V[J],me=$[ie.materialIndex];if(me&&me.visible){const fe=y(T,me,w,N);T.onBeforeShadow(n,T,I,x,te,fe,ie),n.renderBufferDirect(x,null,te,fe,T,ie),T.onAfterShadow(n,T,I,x,te,fe,ie)}}}else if($.visible){const V=y(T,$,w,N);T.onBeforeShadow(n,T,I,x,te,V,null),n.renderBufferDirect(x,null,te,V,T,null),T.onAfterShadow(n,T,I,x,te,V,null)}}const B=T.children;for(let te=0,$=B.length;te<$;te++)_(B[te],I,x,w,N)}function R(T){T.target.removeEventListener("dispose",R);for(const x in l){const w=l[x],N=T.target.uuid;N in w&&(w[N].dispose(),delete w[N])}}}function jm(n,e){function t(){let L=!1;const ue=new Jt;let q=null;const be=new Jt(0,0,0,0);return{setMask:function(Se){q!==Se&&!L&&(n.colorMask(Se,Se,Se,Se),q=Se)},setLocked:function(Se){L=Se},setClear:function(Se,ae,Ce,Le,wt){wt===!0&&(Se*=Le,ae*=Le,Ce*=Le),ue.set(Se,ae,Ce,Le),be.equals(ue)===!1&&(n.clearColor(Se,ae,Ce,Le),be.copy(ue))},reset:function(){L=!1,q=null,be.set(-1,0,0,0)}}}function i(){let L=!1,ue=!1,q=null,be=null,Se=null;return{setReversed:function(ae){if(ue!==ae){const Ce=e.get("EXT_clip_control");ae?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ue=ae;const Le=Se;Se=null,this.setClear(Le)}},getReversed:function(){return ue},setTest:function(ae){ae?oe(n.DEPTH_TEST):ke(n.DEPTH_TEST)},setMask:function(ae){q!==ae&&!L&&(n.depthMask(ae),q=ae)},setFunc:function(ae){if(ue&&(ae=Ld[ae]),be!==ae){switch(ae){case md:n.depthFunc(n.NEVER);break;case pd:n.depthFunc(n.ALWAYS);break;case hd:n.depthFunc(n.LESS);break;case $s:n.depthFunc(n.LEQUAL);break;case ud:n.depthFunc(n.EQUAL);break;case fd:n.depthFunc(n.GEQUAL);break;case dd:n.depthFunc(n.GREATER);break;case ld:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}be=ae}},setLocked:function(ae){L=ae},setClear:function(ae){Se!==ae&&(Se=ae,ue&&(ae=1-ae),n.clearDepth(ae))},reset:function(){L=!1,q=null,be=null,Se=null,ue=!1}}}function s(){let L=!1,ue=null,q=null,be=null,Se=null,ae=null,Ce=null,Le=null,wt=null;return{setTest:function(at){L||(at?oe(n.STENCIL_TEST):ke(n.STENCIL_TEST))},setMask:function(at){ue!==at&&!L&&(n.stencilMask(at),ue=at)},setFunc:function(at,kt,tn){(q!==at||be!==kt||Se!==tn)&&(n.stencilFunc(at,kt,tn),q=at,be=kt,Se=tn)},setOp:function(at,kt,tn){(ae!==at||Ce!==kt||Le!==tn)&&(n.stencilOp(at,kt,tn),ae=at,Ce=kt,Le=tn)},setLocked:function(at){L=at},setClear:function(at){wt!==at&&(n.clearStencil(at),wt=at)},reset:function(){L=!1,ue=null,q=null,be=null,Se=null,ae=null,Ce=null,Le=null,wt=null}}}const a=new t,r=new i,o=new s,c=new WeakMap,l=new WeakMap;let d={},h={},u={},v=new WeakMap,b=[],S=null,g=!1,f=null,E=null,y=null,_=null,R=null,T=null,I=null,x=new Be(0,0,0),w=0,N=!1,O=null,B=null,te=null,$=null,V=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,ie=0;const me=n.getParameter(n.VERSION);me.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(me)[1]),Y=ie>=1):me.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(me)[1]),Y=ie>=2);let fe=null,Ae={};const De=n.getParameter(n.SCISSOR_BOX),dt=n.getParameter(n.VIEWPORT),yt=new Jt().fromArray(De),nt=new Jt().fromArray(dt);function Q(L,ue,q,be){const Se=new Uint8Array(4),ae=n.createTexture();n.bindTexture(L,ae),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ce=0;Ce<q;Ce++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ue,0,n.RGBA,1,1,be,0,n.RGBA,n.UNSIGNED_BYTE,Se):n.texImage2D(ue+Ce,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Se);return ae}const xe={};xe[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),xe[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xe[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),oe(n.DEPTH_TEST),r.setFunc($s),St(!1),xt(yr),oe(n.CULL_FACE),ze(In);function oe(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function ke(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function Oe(L,ue){return u[L]!==ue?(n.bindFramebuffer(L,ue),u[L]=ue,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ue),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ue),!0):!1}function Fe(L,ue){let q=b,be=!1;if(L){q=v.get(ue),q===void 0&&(q=[],v.set(ue,q));const Se=L.textures;if(q.length!==Se.length||q[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,Ce=Se.length;ae<Ce;ae++)q[ae]=n.COLOR_ATTACHMENT0+ae;q.length=Se.length,be=!0}}else q[0]!==n.BACK&&(q[0]=n.BACK,be=!0);be&&n.drawBuffers(q)}function ht(L){return S!==L?(n.useProgram(L),S=L,!0):!1}const Re={[Ui]:n.FUNC_ADD,[Cl]:n.FUNC_SUBTRACT,[Rl]:n.FUNC_REVERSE_SUBTRACT};Re[Pd]=n.MIN,Re[Id]=n.MAX;const Je={[Wl]:n.ZERO,[Vl]:n.ONE,[zl]:n.SRC_COLOR,[Hl]:n.SRC_ALPHA,[Gl]:n.SRC_ALPHA_SATURATE,[Bl]:n.DST_COLOR,[kl]:n.DST_ALPHA,[Fl]:n.ONE_MINUS_SRC_COLOR,[Ol]:n.ONE_MINUS_SRC_ALPHA,[Nl]:n.ONE_MINUS_DST_COLOR,[Ul]:n.ONE_MINUS_DST_ALPHA,[Dl]:n.CONSTANT_COLOR,[Il]:n.ONE_MINUS_CONSTANT_COLOR,[Pl]:n.CONSTANT_ALPHA,[Ll]:n.ONE_MINUS_CONSTANT_ALPHA};function ze(L,ue,q,be,Se,ae,Ce,Le,wt,at){if(L===In){g===!0&&(ke(n.BLEND),g=!1);return}if(g===!1&&(oe(n.BLEND),g=!0),L!==_d){if(L!==f||at!==N){if((E!==Ui||R!==Ui)&&(n.blendEquation(n.FUNC_ADD),E=Ui,R=Ui),at)switch(L){case ji:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bs:n.blendFunc(n.ONE,n.ONE);break;case Rr:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ar:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:_t("WebGLState: Invalid blending: ",L);break}else switch(L){case ji:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Rr:_t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ar:_t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:_t("WebGLState: Invalid blending: ",L);break}y=null,_=null,T=null,I=null,x.set(0,0,0),w=0,f=L,N=at}return}Se=Se||ue,ae=ae||q,Ce=Ce||be,(ue!==E||Se!==R)&&(n.blendEquationSeparate(Re[ue],Re[Se]),E=ue,R=Se),(q!==y||be!==_||ae!==T||Ce!==I)&&(n.blendFuncSeparate(Je[q],Je[be],Je[ae],Je[Ce]),y=q,_=be,T=ae,I=Ce),(Le.equals(x)===!1||wt!==w)&&(n.blendColor(Le.r,Le.g,Le.b,wt),x.copy(Le),w=wt),f=L,N=!1}function Ye(L,ue){L.side===ln?ke(n.CULL_FACE):oe(n.CULL_FACE);let q=L.side===qt;ue&&(q=!q),St(q),L.blending===ji&&L.transparent===!1?ze(In):ze(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),a.setMask(L.colorWrite);const be=L.stencilWrite;o.setTest(be),be&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Rt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):ke(n.SAMPLE_ALPHA_TO_COVERAGE)}function St(L){O!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),O=L)}function xt(L){L!==gd?(oe(n.CULL_FACE),L!==B&&(L===yr?n.cullFace(n.BACK):L===vd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ke(n.CULL_FACE),B=L}function At(L){L!==te&&(Y&&n.lineWidth(L),te=L)}function Rt(L,ue,q){L?(oe(n.POLYGON_OFFSET_FILL),($!==ue||V!==q)&&($=ue,V=q,r.getReversed()&&(ue=-ue),n.polygonOffset(ue,q))):ke(n.POLYGON_OFFSET_FILL)}function pt(L){L?oe(n.SCISSOR_TEST):ke(n.SCISSOR_TEST)}function Et(L){L===void 0&&(L=n.TEXTURE0+J-1),fe!==L&&(n.activeTexture(L),fe=L)}function P(L,ue,q){q===void 0&&(fe===null?q=n.TEXTURE0+J-1:q=fe);let be=Ae[q];be===void 0&&(be={type:void 0,texture:void 0},Ae[q]=be),(be.type!==L||be.texture!==ue)&&(fe!==q&&(n.activeTexture(q),fe=q),n.bindTexture(L,ue||xe[L]),be.type=L,be.texture=ue)}function Tt(){const L=Ae[fe];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function We(){try{n.compressedTexImage2D(...arguments)}catch(L){_t("WebGLState:",L)}}function M(){try{n.compressedTexImage3D(...arguments)}catch(L){_t("WebGLState:",L)}}function m(){try{n.texSubImage2D(...arguments)}catch(L){_t("WebGLState:",L)}}function F(){try{n.texSubImage3D(...arguments)}catch(L){_t("WebGLState:",L)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(L){_t("WebGLState:",L)}}function W(){try{n.compressedTexSubImage3D(...arguments)}catch(L){_t("WebGLState:",L)}}function le(){try{n.texStorage2D(...arguments)}catch(L){_t("WebGLState:",L)}}function ve(){try{n.texStorage3D(...arguments)}catch(L){_t("WebGLState:",L)}}function K(){try{n.texImage2D(...arguments)}catch(L){_t("WebGLState:",L)}}function Z(){try{n.texImage3D(...arguments)}catch(L){_t("WebGLState:",L)}}function de(L){return h[L]!==void 0?h[L]:n.getParameter(L)}function Pe(L,ue){h[L]!==ue&&(n.pixelStorei(L,ue),h[L]=ue)}function ge(L){yt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),yt.copy(L))}function pe(L){nt.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),nt.copy(L))}function Ue(L,ue){let q=l.get(ue);q===void 0&&(q=new WeakMap,l.set(ue,q));let be=q.get(L);be===void 0&&(be=n.getUniformBlockIndex(ue,L.name),q.set(L,be))}function Ne(L,ue){const be=l.get(ue).get(L);c.get(ue)!==be&&(n.uniformBlockBinding(ue,be,L.__bindingPointIndex),c.set(ue,be))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},h={},fe=null,Ae={},u={},v=new WeakMap,b=[],S=null,g=!1,f=null,E=null,y=null,_=null,R=null,T=null,I=null,x=new Be(0,0,0),w=0,N=!1,O=null,B=null,te=null,$=null,V=null,yt.set(0,0,n.canvas.width,n.canvas.height),nt.set(0,0,n.canvas.width,n.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:oe,disable:ke,bindFramebuffer:Oe,drawBuffers:Fe,useProgram:ht,setBlending:ze,setMaterial:Ye,setFlipSided:St,setCullFace:xt,setLineWidth:At,setPolygonOffset:Rt,setScissorTest:pt,activeTexture:Et,bindTexture:P,unbindTexture:Tt,compressedTexImage2D:We,compressedTexImage3D:M,texImage2D:K,texImage3D:Z,pixelStorei:Pe,getParameter:de,updateUBOMapping:Ue,uniformBlockBinding:Ne,texStorage2D:le,texStorage3D:ve,texSubImage2D:m,texSubImage3D:F,compressedTexSubImage2D:H,compressedTexSubImage3D:W,scissor:ge,viewport:pe,reset:Ge}}function Ym(n,e,t,i,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ut,d=new WeakMap,h=new Set;let u;const v=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(M,m){return b?new OffscreenCanvas(M,m):yd("canvas")}function g(M,m,F){let H=1;const W=We(M);if((W.width>F||W.height>F)&&(H=F/Math.max(W.width,W.height)),H<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const le=Math.floor(H*W.width),ve=Math.floor(H*W.height);u===void 0&&(u=S(le,ve));const K=m?S(le,ve):u;return K.width=le,K.height=ve,K.getContext("2d").drawImage(M,0,0,le,ve),lt("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+le+"x"+ve+")."),K}else return"data"in M&&lt("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),M;return M}function f(M){return M.generateMipmaps}function E(M){n.generateMipmap(M)}function y(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(M,m,F,H,W,le=!1){if(M!==null){if(n[M]!==void 0)return n[M];lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let ve;H&&(ve=e.get("EXT_texture_norm16"),ve||lt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=m;if(m===n.RED&&(F===n.FLOAT&&(K=n.R32F),F===n.HALF_FLOAT&&(K=n.R16F),F===n.UNSIGNED_BYTE&&(K=n.R8),F===n.UNSIGNED_SHORT&&ve&&(K=ve.R16_EXT),F===n.SHORT&&ve&&(K=ve.R16_SNORM_EXT)),m===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(K=n.R8UI),F===n.UNSIGNED_SHORT&&(K=n.R16UI),F===n.UNSIGNED_INT&&(K=n.R32UI),F===n.BYTE&&(K=n.R8I),F===n.SHORT&&(K=n.R16I),F===n.INT&&(K=n.R32I)),m===n.RG&&(F===n.FLOAT&&(K=n.RG32F),F===n.HALF_FLOAT&&(K=n.RG16F),F===n.UNSIGNED_BYTE&&(K=n.RG8),F===n.UNSIGNED_SHORT&&ve&&(K=ve.RG16_EXT),F===n.SHORT&&ve&&(K=ve.RG16_SNORM_EXT)),m===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(K=n.RG8UI),F===n.UNSIGNED_SHORT&&(K=n.RG16UI),F===n.UNSIGNED_INT&&(K=n.RG32UI),F===n.BYTE&&(K=n.RG8I),F===n.SHORT&&(K=n.RG16I),F===n.INT&&(K=n.RG32I)),m===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(K=n.RGB8UI),F===n.UNSIGNED_SHORT&&(K=n.RGB16UI),F===n.UNSIGNED_INT&&(K=n.RGB32UI),F===n.BYTE&&(K=n.RGB8I),F===n.SHORT&&(K=n.RGB16I),F===n.INT&&(K=n.RGB32I)),m===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),F===n.UNSIGNED_INT&&(K=n.RGBA32UI),F===n.BYTE&&(K=n.RGBA8I),F===n.SHORT&&(K=n.RGBA16I),F===n.INT&&(K=n.RGBA32I)),m===n.RGB&&(F===n.UNSIGNED_SHORT&&ve&&(K=ve.RGB16_EXT),F===n.SHORT&&ve&&(K=ve.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),m===n.RGBA){const Z=le?Oc:Mt.getTransfer(W);F===n.FLOAT&&(K=n.RGBA32F),F===n.HALF_FLOAT&&(K=n.RGBA16F),F===n.UNSIGNED_BYTE&&(K=Z===vt?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&ve&&(K=ve.RGBA16_EXT),F===n.SHORT&&ve&&(K=ve.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function R(M,m){let F;return M?m===null||m===ni||m===Ji?F=n.DEPTH24_STENCIL8:m===Hn?F=n.DEPTH32F_STENCIL8:m===Aa&&(F=n.DEPTH24_STENCIL8,lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):m===null||m===ni||m===Ji?F=n.DEPTH_COMPONENT24:m===Hn?F=n.DEPTH_COMPONENT32F:m===Aa&&(F=n.DEPTH_COMPONENT16),F}function T(M,m){return f(M)===!0||M.isFramebufferTexture&&M.minFilter!==Pn&&M.minFilter!==Kt?Math.log2(Math.max(m.width,m.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?m.mipmaps.length:1}function I(M){const m=M.target;m.removeEventListener("dispose",I),w(m),m.isVideoTexture&&d.delete(m),m.isHTMLTexture&&h.delete(m)}function x(M){const m=M.target;m.removeEventListener("dispose",x),O(m)}function w(M){const m=i.get(M);if(m.__webglInit===void 0)return;const F=M.source,H=v.get(F);if(H){const W=H[m.__cacheKey];W.usedTimes--,W.usedTimes===0&&N(M),Object.keys(H).length===0&&v.delete(F)}i.remove(M)}function N(M){const m=i.get(M);n.deleteTexture(m.__webglTexture);const F=M.source,H=v.get(F);delete H[m.__cacheKey],r.memory.textures--}function O(M){const m=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(m.__webglFramebuffer[H]))for(let W=0;W<m.__webglFramebuffer[H].length;W++)n.deleteFramebuffer(m.__webglFramebuffer[H][W]);else n.deleteFramebuffer(m.__webglFramebuffer[H]);m.__webglDepthbuffer&&n.deleteRenderbuffer(m.__webglDepthbuffer[H])}else{if(Array.isArray(m.__webglFramebuffer))for(let H=0;H<m.__webglFramebuffer.length;H++)n.deleteFramebuffer(m.__webglFramebuffer[H]);else n.deleteFramebuffer(m.__webglFramebuffer);if(m.__webglDepthbuffer&&n.deleteRenderbuffer(m.__webglDepthbuffer),m.__webglMultisampledFramebuffer&&n.deleteFramebuffer(m.__webglMultisampledFramebuffer),m.__webglColorRenderbuffer)for(let H=0;H<m.__webglColorRenderbuffer.length;H++)m.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(m.__webglColorRenderbuffer[H]);m.__webglDepthRenderbuffer&&n.deleteRenderbuffer(m.__webglDepthRenderbuffer)}const F=M.textures;for(let H=0,W=F.length;H<W;H++){const le=i.get(F[H]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),r.memory.textures--),i.remove(F[H])}i.remove(M)}let B=0;function te(){B=0}function $(){return B}function V(M){B=M}function J(){const M=B;return M>=s.maxTextures&&lt("WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),B+=1,M}function Y(M){const m=[];return m.push(M.wrapS),m.push(M.wrapT),m.push(M.wrapR||0),m.push(M.magFilter),m.push(M.minFilter),m.push(M.anisotropy),m.push(M.internalFormat),m.push(M.format),m.push(M.type),m.push(M.generateMipmaps),m.push(M.premultiplyAlpha),m.push(M.flipY),m.push(M.unpackAlignment),m.push(M.colorSpace),m.join()}function ie(M,m){const F=i.get(M);if(M.isVideoTexture&&P(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&F.__version!==M.version){const H=M.image;if(H===null)lt("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)lt("WebGLRenderer: Texture marked for update but image is incomplete");else{ke(F,M,m);return}}else M.isExternalTexture&&(F.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+m)}function me(M,m){const F=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&F.__version!==M.version){ke(F,M,m);return}else M.isExternalTexture&&(F.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+m)}function fe(M,m){const F=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&F.__version!==M.version){ke(F,M,m);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+m)}function Ae(M,m){const F=i.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&F.__version!==M.version){Oe(F,M,m);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+m)}const De={[ii]:n.REPEAT,[ya]:n.CLAMP_TO_EDGE,[_c]:n.MIRRORED_REPEAT},dt={[Pn]:n.NEAREST,[xc]:n.NEAREST_MIPMAP_NEAREST,[zi]:n.NEAREST_MIPMAP_LINEAR,[Kt]:n.LINEAR,[ba]:n.LINEAR_MIPMAP_NEAREST,[Gn]:n.LINEAR_MIPMAP_LINEAR},yt={[ql]:n.NEVER,[$l]:n.ALWAYS,[Yl]:n.LESS,[Gs]:n.LEQUAL,[jl]:n.EQUAL,[Bs]:n.GEQUAL,[Kl]:n.GREATER,[Xl]:n.NOTEQUAL};function nt(M,m){if(m.type===Hn&&e.has("OES_texture_float_linear")===!1&&(m.magFilter===Kt||m.magFilter===ba||m.magFilter===zi||m.magFilter===Gn||m.minFilter===Kt||m.minFilter===ba||m.minFilter===zi||m.minFilter===Gn)&&lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,De[m.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,De[m.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,De[m.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,dt[m.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,dt[m.minFilter]),m.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,yt[m.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(m.magFilter===Pn||m.minFilter!==zi&&m.minFilter!==Gn||m.type===Hn&&e.has("OES_texture_float_linear")===!1)return;if(m.anisotropy>1||i.get(m).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(M,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(m.anisotropy,s.getMaxAnisotropy())),i.get(m).__currentAnisotropy=m.anisotropy}}}function Q(M,m){let F=!1;M.__webglInit===void 0&&(M.__webglInit=!0,m.addEventListener("dispose",I));const H=m.source;let W=v.get(H);W===void 0&&(W={},v.set(H,W));const le=Y(m);if(le!==M.__cacheKey){W[le]===void 0&&(W[le]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,F=!0),W[le].usedTimes++;const ve=W[M.__cacheKey];ve!==void 0&&(W[M.__cacheKey].usedTimes--,ve.usedTimes===0&&N(m)),M.__cacheKey=le,M.__webglTexture=W[le].texture}return F}function xe(M,m,F){return Math.floor(Math.floor(M/F)/m)}function oe(M,m,F,H){const le=M.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,m.width,m.height,F,H,m.data);else{le.sort((Pe,ge)=>Pe.start-ge.start);let ve=0;for(let Pe=1;Pe<le.length;Pe++){const ge=le[ve],pe=le[Pe],Ue=ge.start+ge.count,Ne=xe(pe.start,m.width,4),Ge=xe(ge.start,m.width,4);pe.start<=Ue+1&&Ne===Ge&&xe(pe.start+pe.count-1,m.width,4)===Ne?ge.count=Math.max(ge.count,pe.start+pe.count-ge.start):(++ve,le[ve]=pe)}le.length=ve+1;const K=t.getParameter(n.UNPACK_ROW_LENGTH),Z=t.getParameter(n.UNPACK_SKIP_PIXELS),de=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,m.width);for(let Pe=0,ge=le.length;Pe<ge;Pe++){const pe=le[Pe],Ue=Math.floor(pe.start/4),Ne=Math.ceil(pe.count/4),Ge=Ue%m.width,L=Math.floor(Ue/m.width),ue=Ne,q=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,Ge,L,ue,q,F,H,m.data)}M.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,K),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(n.UNPACK_SKIP_ROWS,de)}}function ke(M,m,F){let H=n.TEXTURE_2D;(m.isDataArrayTexture||m.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),m.isData3DTexture&&(H=n.TEXTURE_3D);const W=Q(M,m),le=m.source;t.bindTexture(H,M.__webglTexture,n.TEXTURE0+F);const ve=i.get(le);if(le.version!==ve.__version||W===!0){if(t.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&m.image instanceof ImageBitmap)===!1){const q=Mt.getPrimaries(Mt.workingColorSpace),be=m.colorSpace===pi?null:Mt.getPrimaries(m.colorSpace),Se=m.colorSpace===pi||q===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,m.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(n.UNPACK_ALIGNMENT,m.unpackAlignment);let Z=g(m.image,!1,s.maxTextureSize);Z=Tt(m,Z);const de=a.convert(m.format,m.colorSpace),Pe=a.convert(m.type);let ge=_(m.internalFormat,de,Pe,m.normalized,m.colorSpace,m.isVideoTexture);nt(H,m);let pe;const Ue=m.mipmaps,Ne=m.isVideoTexture!==!0,Ge=ve.__version===void 0||W===!0,L=le.dataReady,ue=T(m,Z);if(m.isDepthTexture)ge=R(m.format===gi,m.type),Ge&&(Ne?t.texStorage2D(n.TEXTURE_2D,1,ge,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,ge,Z.width,Z.height,0,de,Pe,null));else if(m.isDataTexture)if(Ue.length>0){Ne&&Ge&&t.texStorage2D(n.TEXTURE_2D,ue,ge,Ue[0].width,Ue[0].height);for(let q=0,be=Ue.length;q<be;q++)pe=Ue[q],Ne?L&&t.texSubImage2D(n.TEXTURE_2D,q,0,0,pe.width,pe.height,de,Pe,pe.data):t.texImage2D(n.TEXTURE_2D,q,ge,pe.width,pe.height,0,de,Pe,pe.data);m.generateMipmaps=!1}else Ne?(Ge&&t.texStorage2D(n.TEXTURE_2D,ue,ge,Z.width,Z.height),L&&oe(m,Z,de,Pe)):t.texImage2D(n.TEXTURE_2D,0,ge,Z.width,Z.height,0,de,Pe,Z.data);else if(m.isCompressedTexture)if(m.isCompressedArrayTexture){Ne&&Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,ge,Ue[0].width,Ue[0].height,Z.depth);for(let q=0,be=Ue.length;q<be;q++)if(pe=Ue[q],m.format!==Ln)if(de!==null)if(Ne){if(L)if(m.layerUpdates.size>0){const Se=Lr(pe.width,pe.height,m.format,m.type);for(const ae of m.layerUpdates){const Ce=pe.data.subarray(ae*Se/pe.data.BYTES_PER_ELEMENT,(ae+1)*Se/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,ae,pe.width,pe.height,1,de,Ce)}m.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,pe.width,pe.height,Z.depth,de,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,q,ge,pe.width,pe.height,Z.depth,0,pe.data,0,0);else lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,pe.width,pe.height,Z.depth,de,Pe,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,q,ge,pe.width,pe.height,Z.depth,0,de,Pe,pe.data)}else{Ne&&Ge&&t.texStorage2D(n.TEXTURE_2D,ue,ge,Ue[0].width,Ue[0].height);for(let q=0,be=Ue.length;q<be;q++)pe=Ue[q],m.format!==Ln?de!==null?Ne?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,q,0,0,pe.width,pe.height,de,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,q,ge,pe.width,pe.height,0,pe.data):lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?L&&t.texSubImage2D(n.TEXTURE_2D,q,0,0,pe.width,pe.height,de,Pe,pe.data):t.texImage2D(n.TEXTURE_2D,q,ge,pe.width,pe.height,0,de,Pe,pe.data)}else if(m.isDataArrayTexture)if(Ne){if(Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,ge,Z.width,Z.height,Z.depth),L)if(m.layerUpdates.size>0){const q=Lr(Z.width,Z.height,m.format,m.type);for(const be of m.layerUpdates){const Se=Z.data.subarray(be*q/Z.data.BYTES_PER_ELEMENT,(be+1)*q/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,be,Z.width,Z.height,1,de,Pe,Se)}m.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,de,Pe,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ge,Z.width,Z.height,Z.depth,0,de,Pe,Z.data);else if(m.isData3DTexture)Ne?(Ge&&t.texStorage3D(n.TEXTURE_3D,ue,ge,Z.width,Z.height,Z.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,de,Pe,Z.data)):t.texImage3D(n.TEXTURE_3D,0,ge,Z.width,Z.height,Z.depth,0,de,Pe,Z.data);else if(m.isFramebufferTexture){if(Ge)if(Ne)t.texStorage2D(n.TEXTURE_2D,ue,ge,Z.width,Z.height);else{let q=Z.width,be=Z.height;for(let Se=0;Se<ue;Se++)t.texImage2D(n.TEXTURE_2D,Se,ge,q,be,0,de,Pe,null),q>>=1,be>>=1}}else if(m.isHTMLTexture){if("texElementImage2D"in n){const q=n.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),Z.parentNode!==q){q.appendChild(Z),h.add(m),q.onpaint=be=>{const Se=be.changedElements;for(const ae of h)Se.includes(ae.image)&&(ae.needsUpdate=!0)},q.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Z);else{const Se=n.RGBA,ae=n.RGBA,Ce=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Se,ae,Ce,Z)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(Ne&&Ge){const q=We(Ue[0]);t.texStorage2D(n.TEXTURE_2D,ue,ge,q.width,q.height)}for(let q=0,be=Ue.length;q<be;q++)pe=Ue[q],Ne?L&&t.texSubImage2D(n.TEXTURE_2D,q,0,0,de,Pe,pe):t.texImage2D(n.TEXTURE_2D,q,ge,de,Pe,pe);m.generateMipmaps=!1}else if(Ne){if(Ge){const q=We(Z);t.texStorage2D(n.TEXTURE_2D,ue,ge,q.width,q.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Pe,Z)}else t.texImage2D(n.TEXTURE_2D,0,ge,de,Pe,Z);f(m)&&E(H),ve.__version=le.version,m.onUpdate&&m.onUpdate(m)}M.__version=m.version}function Oe(M,m,F){if(m.image.length!==6)return;const H=Q(M,m),W=m.source;t.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+F);const le=i.get(W);if(W.version!==le.__version||H===!0){t.activeTexture(n.TEXTURE0+F);const ve=Mt.getPrimaries(Mt.workingColorSpace),K=m.colorSpace===pi?null:Mt.getPrimaries(m.colorSpace),Z=m.colorSpace===pi||ve===K?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,m.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,m.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const de=m.isCompressedTexture||m.image[0].isCompressedTexture,Pe=m.image[0]&&m.image[0].isDataTexture,ge=[];for(let ae=0;ae<6;ae++)!de&&!Pe?ge[ae]=g(m.image[ae],!0,s.maxCubemapSize):ge[ae]=Pe?m.image[ae].image:m.image[ae],ge[ae]=Tt(m,ge[ae]);const pe=ge[0],Ue=a.convert(m.format,m.colorSpace),Ne=a.convert(m.type),Ge=_(m.internalFormat,Ue,Ne,m.normalized,m.colorSpace),L=m.isVideoTexture!==!0,ue=le.__version===void 0||H===!0,q=W.dataReady;let be=T(m,pe);nt(n.TEXTURE_CUBE_MAP,m);let Se;if(de){L&&ue&&t.texStorage2D(n.TEXTURE_CUBE_MAP,be,Ge,pe.width,pe.height);for(let ae=0;ae<6;ae++){Se=ge[ae].mipmaps;for(let Ce=0;Ce<Se.length;Ce++){const Le=Se[Ce];m.format!==Ln?Ue!==null?L?q&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce,0,0,Le.width,Le.height,Ue,Le.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce,Ge,Le.width,Le.height,0,Le.data):lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce,0,0,Le.width,Le.height,Ue,Ne,Le.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce,Ge,Le.width,Le.height,0,Ue,Ne,Le.data)}}}else{if(Se=m.mipmaps,L&&ue){Se.length>0&&be++;const ae=We(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,be,Ge,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Pe){L?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ge[ae].width,ge[ae].height,Ue,Ne,ge[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ge,ge[ae].width,ge[ae].height,0,Ue,Ne,ge[ae].data);for(let Ce=0;Ce<Se.length;Ce++){const wt=Se[Ce].image[ae].image;L?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce+1,0,0,wt.width,wt.height,Ue,Ne,wt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce+1,Ge,wt.width,wt.height,0,Ue,Ne,wt.data)}}else{L?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ue,Ne,ge[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ge,Ue,Ne,ge[ae]);for(let Ce=0;Ce<Se.length;Ce++){const Le=Se[Ce];L?q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce+1,0,0,Ue,Ne,Le.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce+1,Ge,Ue,Ne,Le.image[ae])}}}f(m)&&E(n.TEXTURE_CUBE_MAP),le.__version=W.version,m.onUpdate&&m.onUpdate(m)}M.__version=m.version}function Fe(M,m,F,H,W,le){const ve=a.convert(F.format,F.colorSpace),K=a.convert(F.type),Z=_(F.internalFormat,ve,K,F.normalized,F.colorSpace),de=i.get(m),Pe=i.get(F);if(Pe.__renderTarget=m,!de.__hasExternalTextures){const ge=Math.max(1,m.width>>le),pe=Math.max(1,m.height>>le);W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?t.texImage3D(W,le,Z,ge,pe,m.depth,0,ve,K,null):t.texImage2D(W,le,Z,ge,pe,0,ve,K,null)}t.bindFramebuffer(n.FRAMEBUFFER,M),Et(m)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,W,Pe.__webglTexture,0,pt(m)):(W===n.TEXTURE_2D||W>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,W,Pe.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(M,m,F){if(n.bindRenderbuffer(n.RENDERBUFFER,M),m.depthBuffer){const H=m.depthTexture,W=H&&H.isDepthTexture?H.type:null,le=R(m.stencilBuffer,W),ve=m.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Et(m)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt(m),le,m.width,m.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt(m),le,m.width,m.height):n.renderbufferStorage(n.RENDERBUFFER,le,m.width,m.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,M)}else{const H=m.textures;for(let W=0;W<H.length;W++){const le=H[W],ve=a.convert(le.format,le.colorSpace),K=a.convert(le.type),Z=_(le.internalFormat,ve,K,le.normalized,le.colorSpace);Et(m)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt(m),Z,m.width,m.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt(m),Z,m.width,m.height):n.renderbufferStorage(n.RENDERBUFFER,Z,m.width,m.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Re(M,m,F){const H=m.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,M),!(m.depthTexture&&m.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=i.get(m.depthTexture);if(W.__renderTarget=m,(!W.__webglTexture||m.depthTexture.image.width!==m.width||m.depthTexture.image.height!==m.height)&&(m.depthTexture.image.width=m.width,m.depthTexture.image.height=m.height,m.depthTexture.needsUpdate=!0),H){if(W.__webglInit===void 0&&(W.__webglInit=!0,m.depthTexture.addEventListener("dispose",I)),W.__webglTexture===void 0){W.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),nt(n.TEXTURE_CUBE_MAP,m.depthTexture);const de=a.convert(m.depthTexture.format),Pe=a.convert(m.depthTexture.type);let ge;m.depthTexture.format===Ei?ge=n.DEPTH_COMPONENT24:m.depthTexture.format===gi&&(ge=n.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,ge,m.width,m.height,0,de,Pe,null)}}else ie(m.depthTexture,0);const le=W.__webglTexture,ve=pt(m),K=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,Z=m.depthTexture.format===gi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(m.depthTexture.format===Ei)Et(m)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,K,le,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,Z,K,le,0);else if(m.depthTexture.format===gi)Et(m)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,K,le,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,Z,K,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Je(M){const m=i.get(M),F=M.isWebGLCubeRenderTarget===!0;if(m.__boundDepthTexture!==M.depthTexture){const H=M.depthTexture;if(m.__depthDisposeCallback&&m.__depthDisposeCallback(),H){const W=()=>{delete m.__boundDepthTexture,delete m.__depthDisposeCallback,H.removeEventListener("dispose",W)};H.addEventListener("dispose",W),m.__depthDisposeCallback=W}m.__boundDepthTexture=H}if(M.depthTexture&&!m.__autoAllocateDepthBuffer)if(F)for(let H=0;H<6;H++)Re(m.__webglFramebuffer[H],M,H);else{const H=M.texture.mipmaps;H&&H.length>0?Re(m.__webglFramebuffer[0],M,0):Re(m.__webglFramebuffer,M,0)}else if(F){m.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,m.__webglFramebuffer[H]),m.__webglDepthbuffer[H]===void 0)m.__webglDepthbuffer[H]=n.createRenderbuffer(),ht(m.__webglDepthbuffer[H],M,!1);else{const W=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=m.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,le)}}else{const H=M.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,m.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,m.__webglFramebuffer),m.__webglDepthbuffer===void 0)m.__webglDepthbuffer=n.createRenderbuffer(),ht(m.__webglDepthbuffer,M,!1);else{const W=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=m.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ze(M,m,F){const H=i.get(M);m!==void 0&&Fe(H.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Je(M)}function Ye(M){const m=M.texture,F=i.get(M),H=i.get(m);M.addEventListener("dispose",x);const W=M.textures,le=M.isWebGLCubeRenderTarget===!0,ve=W.length>1;if(ve||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=m.version,r.memory.textures++),le){F.__webglFramebuffer=[];for(let K=0;K<6;K++)if(m.mipmaps&&m.mipmaps.length>0){F.__webglFramebuffer[K]=[];for(let Z=0;Z<m.mipmaps.length;Z++)F.__webglFramebuffer[K][Z]=n.createFramebuffer()}else F.__webglFramebuffer[K]=n.createFramebuffer()}else{if(m.mipmaps&&m.mipmaps.length>0){F.__webglFramebuffer=[];for(let K=0;K<m.mipmaps.length;K++)F.__webglFramebuffer[K]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(ve)for(let K=0,Z=W.length;K<Z;K++){const de=i.get(W[K]);de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture(),r.memory.textures++)}if(M.samples>0&&Et(M)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let K=0;K<W.length;K++){const Z=W[K];F.__webglColorRenderbuffer[K]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[K]);const de=a.convert(Z.format,Z.colorSpace),Pe=a.convert(Z.type),ge=_(Z.internalFormat,de,Pe,Z.normalized,Z.colorSpace,M.isXRRenderTarget===!0),pe=pt(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,ge,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+K,n.RENDERBUFFER,F.__webglColorRenderbuffer[K])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),ht(F.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),nt(n.TEXTURE_CUBE_MAP,m);for(let K=0;K<6;K++)if(m.mipmaps&&m.mipmaps.length>0)for(let Z=0;Z<m.mipmaps.length;Z++)Fe(F.__webglFramebuffer[K][Z],M,m,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Z);else Fe(F.__webglFramebuffer[K],M,m,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);f(m)&&E(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let K=0,Z=W.length;K<Z;K++){const de=W[K],Pe=i.get(de);let ge=n.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(ge=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,Pe.__webglTexture),nt(ge,de),Fe(F.__webglFramebuffer,M,de,n.COLOR_ATTACHMENT0+K,ge,0),f(de)&&E(ge)}t.unbindTexture()}else{let K=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(K=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(K,H.__webglTexture),nt(K,m),m.mipmaps&&m.mipmaps.length>0)for(let Z=0;Z<m.mipmaps.length;Z++)Fe(F.__webglFramebuffer[Z],M,m,n.COLOR_ATTACHMENT0,K,Z);else Fe(F.__webglFramebuffer,M,m,n.COLOR_ATTACHMENT0,K,0);f(m)&&E(K),t.unbindTexture()}M.depthBuffer&&Je(M)}function St(M){const m=M.textures;for(let F=0,H=m.length;F<H;F++){const W=m[F];if(f(W)){const le=y(M),ve=i.get(W).__webglTexture;t.bindTexture(le,ve),E(le),t.unbindTexture()}}}const xt=[],At=[];function Rt(M){if(M.samples>0){if(Et(M)===!1){const m=M.textures,F=M.width,H=M.height;let W=n.COLOR_BUFFER_BIT;const le=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=i.get(M),K=m.length>1;if(K)for(let de=0;de<m.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const Z=M.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let de=0;de<m.length;de++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(W|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(W|=n.STENCIL_BUFFER_BIT)),K){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ve.__webglColorRenderbuffer[de]);const Pe=i.get(m[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pe,0)}n.blitFramebuffer(0,0,F,H,0,0,F,H,W,n.NEAREST),c===!0&&(xt.length=0,At.length=0,xt.push(n.COLOR_ATTACHMENT0+de),M.depthBuffer&&M.resolveDepthBuffer===!1&&(xt.push(le),At.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,At)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),K)for(let de=0;de<m.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,ve.__webglColorRenderbuffer[de]);const Pe=i.get(m[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&c){const m=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[m])}}}function pt(M){return Math.min(s.maxSamples,M.samples)}function Et(M){const m=i.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&m.__useRenderToTexture!==!1}function P(M){const m=r.render.frame;d.get(M)!==m&&(d.set(M,m),M.update())}function Tt(M,m){const F=M.colorSpace,H=M.format,W=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||F!==hn&&F!==pi&&(Mt.getTransfer(F)===vt?(H!==Ln||W!==Sn)&&lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):_t("WebGLTextures: Unsupported texture color space:",F)),m}function We(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(l.width=M.naturalWidth||M.width,l.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(l.width=M.displayWidth,l.height=M.displayHeight):(l.width=M.width,l.height=M.height),l}this.allocateTextureUnit=J,this.resetTextureUnits=te,this.getTextureUnits=$,this.setTextureUnits=V,this.setTexture2D=ie,this.setTexture2DArray=me,this.setTexture3D=fe,this.setTextureCube=Ae,this.rebindTextures=ze,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=Et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function $m(n,e){function t(i,s=pi){let a;const r=Mt.getTransfer(s);if(i===Sn)return n.UNSIGNED_BYTE;if(i===Ec)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Tc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===nd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===id)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ad)return n.BYTE;if(i===sd)return n.SHORT;if(i===Aa)return n.UNSIGNED_SHORT;if(i===yc)return n.INT;if(i===ni)return n.UNSIGNED_INT;if(i===Hn)return n.FLOAT;if(i===Xn)return n.HALF_FLOAT;if(i===rd)return n.ALPHA;if(i===od)return n.RGB;if(i===Ln)return n.RGBA;if(i===Ei)return n.DEPTH_COMPONENT;if(i===gi)return n.DEPTH_STENCIL;if(i===cd)return n.RED;if(i===Sc)return n.RED_INTEGER;if(i===Ti)return n.RG;if(i===Mc)return n.RG_INTEGER;if(i===bc)return n.RGBA_INTEGER;if(i===Ha||i===za||i===Va||i===Wa)if(r===vt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Ha)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===za)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Va)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Wa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Ha)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===za)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Va)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Wa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===qs||i===Zs||i===Js||i===Qs)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===qs)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Zs)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Js)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qs)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===er||i===tr||i===nr||i===ir||i===ar||i===_s||i===sr)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===er||i===tr)return r===vt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===nr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===ir)return a.COMPRESSED_R11_EAC;if(i===ar)return a.COMPRESSED_SIGNED_R11_EAC;if(i===_s)return a.COMPRESSED_RG11_EAC;if(i===sr)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===rr||i===or||i===cr||i===lr||i===dr||i===fr||i===ur||i===hr||i===pr||i===mr||i===gr||i===vr||i===_r||i===xr)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===rr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===or)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===cr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===lr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===dr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ur)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===pr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===mr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===gr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_r)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xr)return r===vt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===br||i===Mr||i===Sr)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===br)return r===vt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Mr)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Sr)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Er||i===Tr||i===xs||i===wr)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Er)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Tr)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xs)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wr)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ji?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const qm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Jm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new wc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new wn({vertexShader:qm,fragmentShader:Zm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ot(new Wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Qm extends El{constructor(e,t){super();const i=this;let s=null,a=1,r=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,v=null,b=null;const S=typeof XRWebGLBinding<"u",g=new Jm,f={},E=t.getContextAttributes();let y=null,_=null;const R=[],T=[],I=new Ut;let x=null;const w=new vi;w.viewport=new Jt;const N=new vi;N.viewport=new Jt;const O=[w,N],B=new Tl;let te=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let xe=R[Q];return xe===void 0&&(xe=new Ga,R[Q]=xe),xe.getTargetRaySpace()},this.getControllerGrip=function(Q){let xe=R[Q];return xe===void 0&&(xe=new Ga,R[Q]=xe),xe.getGripSpace()},this.getHand=function(Q){let xe=R[Q];return xe===void 0&&(xe=new Ga,R[Q]=xe),xe.getHandSpace()};function V(Q){const xe=T.indexOf(Q.inputSource);if(xe===-1)return;const oe=R[xe];oe!==void 0&&(oe.update(Q.inputSource,Q.frame,l||r),oe.dispatchEvent({type:Q.type,data:Q.inputSource}))}function J(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",Y);for(let Q=0;Q<R.length;Q++){const xe=T[Q];xe!==null&&(T[Q]=null,R[Q].disconnect(xe))}te=null,$=null,g.reset();for(const Q in f)delete f[Q];e.setRenderTarget(y),v=null,u=null,h=null,s=null,_=null,nt.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){a=Q,i.isPresenting===!0&&lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return u!==null?u:v},this.getBinding=function(){return h===null&&S&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return b},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",J),s.addEventListener("inputsourceschange",Y),E.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(I),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,ke=null,Oe=null;E.depth&&(Oe=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=E.stencil?gi:Ei,ke=E.stencil?Ji:ni);const Fe={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:a};h=this.getBinding(),u=h.createProjectionLayer(Fe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new Tn(u.textureWidth,u.textureHeight,{format:Ln,type:Sn,depthTexture:new Zi(u.textureWidth,u.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const oe={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:a};v=new XRWebGLLayer(s,t,oe),s.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),_=new Tn(v.framebufferWidth,v.framebufferHeight,{format:Ln,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await s.requestReferenceSpace(o),nt.setContext(s),nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Y(Q){for(let xe=0;xe<Q.removed.length;xe++){const oe=Q.removed[xe],ke=T.indexOf(oe);ke>=0&&(T[ke]=null,R[ke].disconnect(oe))}for(let xe=0;xe<Q.added.length;xe++){const oe=Q.added[xe];let ke=T.indexOf(oe);if(ke===-1){for(let Fe=0;Fe<R.length;Fe++)if(Fe>=T.length){T.push(oe),ke=Fe;break}else if(T[Fe]===null){T[Fe]=oe,ke=Fe;break}if(ke===-1)break}const Oe=R[ke];Oe&&Oe.connect(oe)}}const ie=new he,me=new he;function fe(Q,xe,oe){ie.setFromMatrixPosition(xe.matrixWorld),me.setFromMatrixPosition(oe.matrixWorld);const ke=ie.distanceTo(me),Oe=xe.projectionMatrix.elements,Fe=oe.projectionMatrix.elements,ht=Oe[14]/(Oe[10]-1),Re=Oe[14]/(Oe[10]+1),Je=(Oe[9]+1)/Oe[5],ze=(Oe[9]-1)/Oe[5],Ye=(Oe[8]-1)/Oe[0],St=(Fe[8]+1)/Fe[0],xt=ht*Ye,At=ht*St,Rt=ke/(-Ye+St),pt=Rt*-Ye;if(xe.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(pt),Q.translateZ(Rt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Oe[10]===-1)Q.projectionMatrix.copy(xe.projectionMatrix),Q.projectionMatrixInverse.copy(xe.projectionMatrixInverse);else{const Et=ht+Rt,P=Re+Rt,Tt=xt-pt,We=At+(ke-pt),M=Je*Re/P*Et,m=ze*Re/P*Et;Q.projectionMatrix.makePerspective(Tt,We,M,m,Et,P),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Ae(Q,xe){xe===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(xe.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let xe=Q.near,oe=Q.far;g.texture!==null&&(g.depthNear>0&&(xe=g.depthNear),g.depthFar>0&&(oe=g.depthFar)),B.near=N.near=w.near=xe,B.far=N.far=w.far=oe,(te!==B.near||$!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),te=B.near,$=B.far),B.layers.mask=Q.layers.mask|6,w.layers.mask=B.layers.mask&-5,N.layers.mask=B.layers.mask&-3;const ke=Q.parent,Oe=B.cameras;Ae(B,ke);for(let Fe=0;Fe<Oe.length;Fe++)Ae(Oe[Fe],ke);Oe.length===2?fe(B,w,N):B.projectionMatrix.copy(w.projectionMatrix),De(Q,B,ke)};function De(Q,xe,oe){oe===null?Q.matrix.copy(xe.matrixWorld):(Q.matrix.copy(oe.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(xe.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(xe.projectionMatrix),Q.projectionMatrixInverse.copy(xe.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=wl*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&v===null))return c},this.setFoveation=function(Q){c=Q,u!==null&&(u.fixedFoveation=Q),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(B)},this.getCameraTexture=function(Q){return f[Q]};let dt=null;function yt(Q,xe){if(d=xe.getViewerPose(l||r),b=xe,d!==null){const oe=d.views;v!==null&&(e.setRenderTargetFramebuffer(_,v.framebuffer),e.setRenderTarget(_));let ke=!1;oe.length!==B.cameras.length&&(B.cameras.length=0,ke=!0);for(let Re=0;Re<oe.length;Re++){const Je=oe[Re];let ze=null;if(v!==null)ze=v.getViewport(Je);else{const St=h.getViewSubImage(u,Je);ze=St.viewport,Re===0&&(e.setRenderTargetTextures(_,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(_))}let Ye=O[Re];Ye===void 0&&(Ye=new vi,Ye.layers.enable(Re),Ye.viewport=new Jt,O[Re]=Ye),Ye.matrix.fromArray(Je.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(Je.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(ze.x,ze.y,ze.width,ze.height),Re===0&&(B.matrix.copy(Ye.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),ke===!0&&B.cameras.push(Ye)}const Oe=s.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){h=i.getBinding();const Re=h.getDepthInformation(oe[0]);Re&&Re.isValid&&Re.texture&&g.init(Re,s.renderState)}if(Oe&&Oe.includes("camera-access")&&S){e.state.unbindTexture(),h=i.getBinding();for(let Re=0;Re<oe.length;Re++){const Je=oe[Re].camera;if(Je){let ze=f[Je];ze||(ze=new wc,f[Je]=ze);const Ye=h.getCameraImage(Je);ze.sourceTexture=Ye}}}}for(let oe=0;oe<R.length;oe++){const ke=T[oe],Oe=R[oe];ke!==null&&Oe!==void 0&&Oe.update(ke,xe,l||r)}dt&&dt(Q,xe),xe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:xe}),b=null}const nt=new Xc;nt.setAnimationLoop(yt),this.setAnimationLoop=function(Q){dt=Q},this.dispose=function(){}}}const e0=new Qt,Jc=new et;Jc.set(-1,0,0,0,1,0,0,0,1);function t0(n,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,Rc(n)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,E,y,_){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?a(g,f):f.isMeshLambertMaterial?(a(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(a(g,f),h(g,f)):f.isMeshPhongMaterial?(a(g,f),d(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(a(g,f),u(g,f),f.isMeshPhysicalMaterial&&v(g,f,_)):f.isMeshMatcapMaterial?(a(g,f),b(g,f)):f.isMeshDepthMaterial?a(g,f):f.isMeshDistanceMaterial?(a(g,f),S(g,f)):f.isMeshNormalMaterial?a(g,f):f.isLineBasicMaterial?(r(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?c(g,f,E,y):f.isSpriteMaterial?l(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===qt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===qt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const E=e.get(f),y=E.envMap,_=E.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(e0.makeRotationFromEuler(_)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Jc),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function r(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function c(g,f,E,y){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*E,g.scale.value=y*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function l(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function d(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function h(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function v(g,f,E){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===qt&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function b(g,f){f.matcap&&(g.matcap.value=f.matcap)}function S(g,f){const E=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function n0(n,e,t,i){let s={},a={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,R){const T=R.program;i.uniformBlockBinding(_,T)}function l(_,R){let T=s[_.id];T===void 0&&(g(_),T=d(_),s[_.id]=T,_.addEventListener("dispose",E));const I=R.program;i.updateUBOMapping(_,I);const x=e.render.frame;a[_.id]!==x&&(u(_),a[_.id]=x)}function d(_){const R=h();_.__bindingPointIndex=R;const T=n.createBuffer(),I=_.__size,x=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,I,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,T),T}function h(){for(let _=0;_<o;_++)if(r.indexOf(_)===-1)return r.push(_),_;return _t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const R=s[_.id],T=_.uniforms,I=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let x=0,w=T.length;x<w;x++){const N=T[x];if(Array.isArray(N))for(let O=0,B=N.length;O<B;O++)v(N[O],x,O,I);else v(N,x,0,I)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function v(_,R,T,I){if(S(_,R,T,I)===!0){const x=_.__offset,w=_.value;if(Array.isArray(w)){let N=0;for(let O=0;O<w.length;O++){const B=w[O],te=f(B);b(B,_.__data,N),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(N+=te.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(w,_.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,_.__data)}}function b(_,R,T){typeof _=="number"||typeof _=="boolean"?R[0]=_:_.isMatrix3?(R[0]=_.elements[0],R[1]=_.elements[1],R[2]=_.elements[2],R[3]=0,R[4]=_.elements[3],R[5]=_.elements[4],R[6]=_.elements[5],R[7]=0,R[8]=_.elements[6],R[9]=_.elements[7],R[10]=_.elements[8],R[11]=0):ArrayBuffer.isView(_)?R.set(new _.constructor(_.buffer,_.byteOffset,R.length)):_.toArray(R,T)}function S(_,R,T,I){const x=_.value,w=R+"_"+T;if(I[w]===void 0)return typeof x=="number"||typeof x=="boolean"?I[w]=x:ArrayBuffer.isView(x)?I[w]=x.slice():I[w]=x.clone(),!0;{const N=I[w];if(typeof x=="number"||typeof x=="boolean"){if(N!==x)return I[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(N.equals(x)===!1)return N.copy(x),!0}}return!1}function g(_){const R=_.uniforms;let T=0;const I=16;for(let w=0,N=R.length;w<N;w++){const O=Array.isArray(R[w])?R[w]:[R[w]];for(let B=0,te=O.length;B<te;B++){const $=O[B],V=Array.isArray($.value)?$.value:[$.value];for(let J=0,Y=V.length;J<Y;J++){const ie=V[J],me=f(ie),fe=T%I,Ae=fe%me.boundary,De=fe+Ae;T+=Ae,De!==0&&I-De<me.storage&&(T+=I-De),$.__data=new Float32Array(me.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=T,T+=me.storage}}}const x=T%I;return x>0&&(T+=I-x),_.__size=T,_.__cache={},this}function f(_){const R={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(R.boundary=4,R.storage=4):_.isVector2?(R.boundary=8,R.storage=8):_.isVector3||_.isColor?(R.boundary=16,R.storage=12):_.isVector4?(R.boundary=16,R.storage=16):_.isMatrix3?(R.boundary=48,R.storage=48):_.isMatrix4?(R.boundary=64,R.storage=64):_.isTexture?lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(R.boundary=16,R.storage=_.byteLength):lt("WebGLRenderer: Unsupported uniform value type.",_),R}function E(_){const R=_.target;R.removeEventListener("dispose",E);const T=r.indexOf(R.__bindingPointIndex);r.splice(T,1),n.deleteBuffer(s[R.id]),delete s[R.id],delete a[R.id]}function y(){for(const _ in s)n.deleteBuffer(s[_]);r=[],s={},a={}}return{bind:c,update:l,dispose:y}}const i0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let gn=null;function a0(){return gn===null&&(gn=new yl(i0,16,16,Ti,Xn),gn.name="DFG_LUT",gn.minFilter=Kt,gn.magFilter=Kt,gn.wrapS=ya,gn.wrapT=ya,gn.generateMipmaps=!1,gn.needsUpdate=!0),gn}class s0{constructor(e={}){const{canvas:t=xl(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:v=Sn}=e;this.isWebGLRenderer=!0;let b;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=i.getContextAttributes().alpha}else b=r;const S=v,g=new Set([bc,Mc,Sc]),f=new Set([Sn,ni,Aa,Ji,Ec,Tc]),E=new Uint32Array(4),y=new Int32Array(4),_=new he;let R=null,T=null;const I=[],x=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=En,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let O=!1,B=null,te=null,$=null,V=null;this._outputColorSpace=Ht;let J=0,Y=0,ie=null,me=-1,fe=null;const Ae=new Jt,De=new Jt;let dt=null;const yt=new Be(0);let nt=0,Q=t.width,xe=t.height,oe=1,ke=null,Oe=null;const Fe=new Jt(0,0,Q,xe),ht=new Jt(0,0,Q,xe);let Re=!1;const Je=new vc;let ze=!1,Ye=!1;const St=new Qt,xt=new he,At=new Jt,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function Et(){return ie===null?oe:1}let P=i;function Tt(p,A){return t.getContext(p,A)}try{const p={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bl}`),t.addEventListener("webglcontextlost",wt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",kt,!1),P===null){const A="webgl2";if(P=Tt(A,p),P===null)throw Tt(A)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(p){throw _t("WebGLRenderer: "+p.message),p}let We,M,m,F,H,W,le,ve,K,Z,de,Pe,ge,pe,Ue,Ne,Ge,L,ue,q,be,Se,ae;function Ce(){We=new ap(P),We.init(),be=new $m(P,We),M=new qh(P,We,e,be),m=new jm(P,We),M.reversedDepthBuffer&&u&&m.buffers.depth.setReversed(!0),te=P.createFramebuffer(),$=P.createFramebuffer(),V=P.createFramebuffer(),F=new op(P),H=new Dm,W=new Ym(P,We,m,H,M,be,F),le=new ip(N),ve=new ff(P),Se=new Yh(P,ve),K=new sp(P,ve,F,Se),Z=new lp(P,K,ve,Se,F),L=new cp(P,M,W),Ue=new Zh(H),de=new Im(N,le,We,M,Se,Ue),Pe=new t0(N,H),ge=new Nm,pe=new Hm(We),Ge=new jh(N,le,m,Z,b,c),Ne=new Km(N,Z,M),ae=new n0(P,F,M,m),ue=new $h(P,We,F),q=new rp(P,We,F),F.programs=de.programs,N.capabilities=M,N.extensions=We,N.properties=H,N.renderLists=ge,N.shadowMap=Ne,N.state=m,N.info=F}Ce(),S!==Sn&&(w=new fp(S,t.width,t.height,o,s,a));const Le=new Qm(N,P);this.xr=Le,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const p=We.get("WEBGL_lose_context");p&&p.loseContext()},this.forceContextRestore=function(){const p=We.get("WEBGL_lose_context");p&&p.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(p){p!==void 0&&(oe=p,this.setSize(Q,xe,!1))},this.getSize=function(p){return p.set(Q,xe)},this.setSize=function(p,A,k=!0){if(Le.isPresenting){lt("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=p,xe=A,t.width=Math.floor(p*oe),t.height=Math.floor(A*oe),k===!0&&(t.style.width=p+"px",t.style.height=A+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,p,A)},this.getDrawingBufferSize=function(p){return p.set(Q*oe,xe*oe).floor()},this.setDrawingBufferSize=function(p,A,k){Q=p,xe=A,oe=k,t.width=Math.floor(p*k),t.height=Math.floor(A*k),this.setViewport(0,0,p,A)},this.setEffects=function(p){if(S===Sn){_t("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(p){for(let A=0;A<p.length;A++)if(p[A].isOutputPass===!0){lt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(p||[])},this.getCurrentViewport=function(p){return p.copy(Ae)},this.getViewport=function(p){return p.copy(Fe)},this.setViewport=function(p,A,k,D){p.isVector4?Fe.set(p.x,p.y,p.z,p.w):Fe.set(p,A,k,D),m.viewport(Ae.copy(Fe).multiplyScalar(oe).round())},this.getScissor=function(p){return p.copy(ht)},this.setScissor=function(p,A,k,D){p.isVector4?ht.set(p.x,p.y,p.z,p.w):ht.set(p,A,k,D),m.scissor(De.copy(ht).multiplyScalar(oe).round())},this.getScissorTest=function(){return Re},this.setScissorTest=function(p){m.setScissorTest(Re=p)},this.setOpaqueSort=function(p){ke=p},this.setTransparentSort=function(p){Oe=p},this.getClearColor=function(p){return p.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(p=!0,A=!0,k=!0){let D=0;if(p){let U=!1;if(ie!==null){const z=ie.texture.format;U=g.has(z)}if(U){const z=ie.texture.type,ne=f.has(z),ee=Ge.getClearColor(),re=Ge.getClearAlpha(),j=ee.r,Te=ee.g,Ie=ee.b;ne?(E[0]=j,E[1]=Te,E[2]=Ie,E[3]=re,P.clearBufferuiv(P.COLOR,0,E)):(y[0]=j,y[1]=Te,y[2]=Ie,y[3]=re,P.clearBufferiv(P.COLOR,0,y))}else D|=P.COLOR_BUFFER_BIT}A&&(D|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(D|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D!==0&&P.clear(D)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(p){p.setRenderer(this),B=p},this.dispose=function(){t.removeEventListener("webglcontextlost",wt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",kt,!1),Ge.dispose(),ge.dispose(),pe.dispose(),H.dispose(),le.dispose(),Z.dispose(),Se.dispose(),ae.dispose(),de.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",ia),Le.removeEventListener("sessionend",aa),mn.stop()};function wt(p){p.preventDefault(),Ks("WebGLRenderer: Context Lost."),O=!0}function at(){Ks("WebGLRenderer: Context Restored."),O=!1;const p=F.autoReset,A=Ne.enabled,k=Ne.autoUpdate,D=Ne.needsUpdate,U=Ne.type;Ce(),F.autoReset=p,Ne.enabled=A,Ne.autoUpdate=k,Ne.needsUpdate=D,Ne.type=U}function kt(p){_t("WebGLRenderer: A WebGL context could not be created. Reason: ",p.statusMessage)}function tn(p){const A=p.target;A.removeEventListener("dispose",tn),ta(A)}function ta(p){na(p),H.remove(p)}function na(p){const A=H.get(p).programs;A!==void 0&&(A.forEach(function(k){de.releaseProgram(k)}),p.isShaderMaterial&&de.releaseShaderCache(p))}this.renderBufferDirect=function(p,A,k,D,U,z){A===null&&(A=Rt);const ne=U.isMesh&&U.matrixWorld.determinantAffine()<0,ee=X(p,A,k,D,U);m.setMaterial(D,ne);let re=k.index,j=1;if(D.wireframe===!0){if(re=K.getWireframeAttribute(k),re===void 0)return;j=2}const Te=k.drawRange,Ie=k.attributes.position;let ye=Te.start*j,Xe=(Te.start+Te.count)*j;z!==null&&(ye=Math.max(ye,z.start*j),Xe=Math.min(Xe,(z.start+z.count)*j)),re!==null?(ye=Math.max(ye,0),Xe=Math.min(Xe,re.count)):Ie!=null&&(ye=Math.max(ye,0),Xe=Math.min(Xe,Ie.count));const Ke=Xe-ye;if(Ke<0||Ke===1/0)return;Se.setup(U,D,ee,k,re);let Qe,Ze=ue;if(re!==null&&(Qe=ve.get(re),Ze=q,Ze.setIndex(Qe)),U.isMesh)D.wireframe===!0?(m.setLineWidth(D.wireframeLinewidth*Et()),Ze.setMode(P.LINES)):Ze.setMode(P.TRIANGLES);else if(U.isLine){let bt=D.linewidth;bt===void 0&&(bt=1),m.setLineWidth(bt*Et()),U.isLineSegments?Ze.setMode(P.LINES):U.isLineLoop?Ze.setMode(P.LINE_LOOP):Ze.setMode(P.LINE_STRIP)}else U.isPoints?Ze.setMode(P.POINTS):U.isSprite&&Ze.setMode(P.TRIANGLES);if(U.isBatchedMesh)if(We.get("WEBGL_multi_draw"))Ze.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const bt=U._multiDrawStarts,we=U._multiDrawCounts,st=U._multiDrawCount,He=re?ve.get(re).bytesPerElement:1,Ct=H.get(D).currentProgram.getUniforms();for(let Vt=0;Vt<st;Vt++)Ct.setValue(P,"_gl_DrawID",Vt),Ze.render(bt[Vt]/He,we[Vt])}else if(U.isInstancedMesh)Ze.renderInstances(ye,Ke,U.count);else if(k.isInstancedBufferGeometry){const bt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,we=Math.min(k.instanceCount,bt);Ze.renderInstances(ye,Ke,we)}else Ze.render(ye,Ke)};function ai(p,A,k){p.transparent===!0&&p.side===ln&&p.forceSinglePass===!1?(p.side=qt,p.needsUpdate=!0,Kn(p,A,k),p.side=Mi,p.needsUpdate=!0,Kn(p,A,k),p.side=ln):Kn(p,A,k)}this.compile=function(p,A,k=null){k===null&&(k=p),T=pe.get(k),T.init(A),x.push(T),k.traverseVisible(function(U){U.isLight&&U.layers.test(A.layers)&&(T.pushLight(U),U.castShadow&&T.pushShadow(U))}),p!==k&&p.traverseVisible(function(U){U.isLight&&U.layers.test(A.layers)&&(T.pushLight(U),U.castShadow&&T.pushShadow(U))}),T.setupLights();const D=new Set;return p.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const z=U.material;if(z)if(Array.isArray(z))for(let ne=0;ne<z.length;ne++){const ee=z[ne];ai(ee,k,U),D.add(ee)}else ai(z,k,U),D.add(z)}),T=x.pop(),D},this.compileAsync=function(p,A,k=null){const D=this.compile(p,A,k);return new Promise(U=>{function z(){if(D.forEach(function(ne){H.get(ne).currentProgram.isReady()&&D.delete(ne)}),D.size===0){U(p);return}setTimeout(z,10)}We.get("KHR_parallel_shader_compile")!==null?z():setTimeout(z,10)})};let si=null;function Ba(p){si&&si(p)}function ia(){mn.stop()}function aa(){mn.start()}const mn=new Xc;mn.setAnimationLoop(Ba),typeof self<"u"&&mn.setContext(self),this.setAnimationLoop=function(p){si=p,Le.setAnimationLoop(p),p===null?mn.stop():mn.start()},Le.addEventListener("sessionstart",ia),Le.addEventListener("sessionend",aa),this.render=function(p,A){if(A!==void 0&&A.isCamera!==!0){_t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;B!==null&&B.renderStart(p,A);const k=Le.enabled===!0&&Le.isPresenting===!0,D=w!==null&&(ie===null||k)&&w.begin(N,ie);if(p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),A.parent===null&&A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(A),A=Le.getCamera()),p.isScene===!0&&p.onBeforeRender(N,p,A,ie),T=pe.get(p,x.length),T.init(A),T.state.textureUnits=W.getTextureUnits(),x.push(T),St.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),Je.setFromProjectionMatrix(St,js,A.reversedDepth),Ye=this.localClippingEnabled,ze=Ue.init(this.clippingPlanes,Ye),R=ge.get(p,I.length),R.init(),I.push(R),Le.enabled===!0&&Le.isPresenting===!0){const ne=N.xr.getDepthSensingMesh();ne!==null&&Pi(ne,A,-1/0,N.sortObjects)}Pi(p,A,0,N.sortObjects),R.finish(),N.sortObjects===!0&&R.sort(ke,Oe,A.reversedDepth),pt=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,pt&&Ge.addToRenderList(R,p),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ze===!0&&Ue.beginShadows();const U=T.state.shadowsArray;if(Ne.render(U,p,A),ze===!0&&Ue.endShadows(),(D&&w.hasRenderPass())===!1){const ne=R.opaque,ee=R.transmissive;if(T.setupLights(),A.isArrayCamera){const re=A.cameras;if(ee.length>0)for(let j=0,Te=re.length;j<Te;j++){const Ie=re[j];ra(ne,ee,p,Ie)}pt&&Ge.render(p);for(let j=0,Te=re.length;j<Te;j++){const Ie=re[j];sa(R,p,Ie,Ie.viewport)}}else ee.length>0&&ra(ne,ee,p,A),pt&&Ge.render(p),sa(R,p,A)}ie!==null&&Y===0&&(W.updateMultisampleRenderTarget(ie),W.updateRenderTargetMipmap(ie)),D&&w.end(N),p.isScene===!0&&p.onAfterRender(N,p,A),Se.resetDefaultState(),me=-1,fe=null,x.pop(),x.length>0?(T=x[x.length-1],W.setTextureUnits(T.state.textureUnits),ze===!0&&Ue.setGlobalState(N.clippingPlanes,T.state.camera)):T=null,I.pop(),I.length>0?R=I[I.length-1]:R=null,B!==null&&B.renderEnd()};function Pi(p,A,k,D){if(p.visible===!1)return;if(p.layers.test(A.layers)){if(p.isGroup)k=p.renderOrder;else if(p.isLOD)p.autoUpdate===!0&&p.update(A);else if(p.isLightProbeGrid)T.pushLightProbeGrid(p);else if(p.isLight)T.pushLight(p),p.castShadow&&T.pushShadow(p);else if(p.isSprite){if(!p.frustumCulled||Je.intersectsSprite(p)){D&&At.setFromMatrixPosition(p.matrixWorld).applyMatrix4(St);const ne=Z.update(p),ee=p.material;ee.visible&&R.push(p,ne,ee,k,At.z,null)}}else if((p.isMesh||p.isLine||p.isPoints)&&(!p.frustumCulled||Je.intersectsObject(p))){const ne=Z.update(p),ee=p.material;if(D&&(p.boundingSphere!==void 0?(p.boundingSphere===null&&p.computeBoundingSphere(),At.copy(p.boundingSphere.center)):(ne.boundingSphere===null&&ne.computeBoundingSphere(),At.copy(ne.boundingSphere.center)),At.applyMatrix4(p.matrixWorld).applyMatrix4(St)),Array.isArray(ee)){const re=ne.groups;for(let j=0,Te=re.length;j<Te;j++){const Ie=re[j],ye=ee[Ie.materialIndex];ye&&ye.visible&&R.push(p,ne,ye,k,At.z,Ie)}}else ee.visible&&R.push(p,ne,ee,k,At.z,null)}}const z=p.children;for(let ne=0,ee=z.length;ne<ee;ne++)Pi(z[ne],A,k,D)}function sa(p,A,k,D){const{opaque:U,transmissive:z,transparent:ne}=p;T.setupLightsView(k),ze===!0&&Ue.setGlobalState(N.clippingPlanes,k),D&&m.viewport(Ae.copy(D)),U.length>0&&ri(U,A,k),z.length>0&&ri(z,A,k),ne.length>0&&ri(ne,A,k),m.buffers.depth.setTest(!0),m.buffers.depth.setMask(!0),m.buffers.color.setMask(!0),m.setPolygonOffset(!1)}function ra(p,A,k,D){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[D.id]===void 0){const ye=We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[D.id]=new Tn(1,1,{generateMipmaps:!0,type:ye?Xn:Sn,minFilter:Gn,samples:Math.max(4,M.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Mt.workingColorSpace})}const z=T.state.transmissionRenderTarget[D.id],ne=D.viewport||Ae;z.setSize(ne.z*N.transmissionResolutionScale,ne.w*N.transmissionResolutionScale);const ee=N.getRenderTarget(),re=N.getActiveCubeFace(),j=N.getActiveMipmapLevel();N.setRenderTarget(z),N.getClearColor(yt),nt=N.getClearAlpha(),nt<1&&N.setClearColor(16777215,.5),N.clear(),pt&&Ge.render(k);const Te=N.toneMapping;N.toneMapping=En;const Ie=D.viewport;if(D.viewport!==void 0&&(D.viewport=void 0),T.setupLightsView(D),ze===!0&&Ue.setGlobalState(N.clippingPlanes,D),ri(p,k,D),W.updateMultisampleRenderTarget(z),W.updateRenderTargetMipmap(z),We.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let Xe=0,Ke=A.length;Xe<Ke;Xe++){const Qe=A[Xe],{object:Ze,geometry:bt,material:we,group:st}=Qe;if(we.side===ln&&Ze.layers.test(D.layers)){const He=we.side;we.side=qt,we.needsUpdate=!0,Un(Ze,k,D,bt,we,st),we.side=He,we.needsUpdate=!0,ye=!0}}ye===!0&&(W.updateMultisampleRenderTarget(z),W.updateRenderTargetMipmap(z))}N.setRenderTarget(ee,re,j),N.setClearColor(yt,nt),Ie!==void 0&&(D.viewport=Ie),N.toneMapping=Te}function ri(p,A,k){const D=A.isScene===!0?A.overrideMaterial:null;for(let U=0,z=p.length;U<z;U++){const ne=p[U],{object:ee,geometry:re,group:j}=ne;let Te=ne.material;Te.allowOverride===!0&&D!==null&&(Te=D),ee.layers.test(k.layers)&&Un(ee,A,k,re,Te,j)}}function Un(p,A,k,D,U,z){p.onBeforeRender(N,A,k,D,U,z),p.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,p.matrixWorld),p.normalMatrix.getNormalMatrix(p.modelViewMatrix),U.onBeforeRender(N,A,k,D,p,z),U.transparent===!0&&U.side===ln&&U.forceSinglePass===!1?(U.side=qt,U.needsUpdate=!0,N.renderBufferDirect(k,A,D,U,p,z),U.side=Mi,U.needsUpdate=!0,N.renderBufferDirect(k,A,D,U,p,z),U.side=ln):N.renderBufferDirect(k,A,D,U,p,z),p.onAfterRender(N,A,k,D,U,z)}function Kn(p,A,k){A.isScene!==!0&&(A=Rt);const D=H.get(p),U=T.state.lights,z=T.state.shadowsArray,ne=U.state.version,ee=de.getParameters(p,U.state,z,A,k,T.state.lightProbeGridArray),re=de.getProgramCacheKey(ee);let j=D.programs;D.environment=p.isMeshStandardMaterial||p.isMeshLambertMaterial||p.isMeshPhongMaterial?A.environment:null,D.fog=A.fog;const Te=p.isMeshStandardMaterial||p.isMeshLambertMaterial&&!p.envMap||p.isMeshPhongMaterial&&!p.envMap;D.envMap=le.get(p.envMap||D.environment,Te),D.envMapRotation=D.environment!==null&&p.envMap===null?A.environmentRotation:p.envMapRotation,j===void 0&&(p.addEventListener("dispose",tn),j=new Map,D.programs=j);let Ie=j.get(re);if(Ie!==void 0){if(D.currentProgram===Ie&&D.lightsStateVersion===ne)return Di(p,ee),Ie}else ee.uniforms=de.getUniforms(p),B!==null&&p.isNodeMaterial&&B.build(p,k,ee),p.onBeforeCompile(ee,N),Ie=de.acquireProgram(ee,re),j.set(re,Ie),D.uniforms=ee.uniforms;const ye=D.uniforms;return(!p.isShaderMaterial&&!p.isRawShaderMaterial||p.clipping===!0)&&(ye.clippingPlanes=Ue.uniform),Di(p,ee),D.needsLights=ce(p),D.lightsStateVersion=ne,D.needsLights&&(ye.ambientLightColor.value=U.state.ambient,ye.lightProbe.value=U.state.probe,ye.directionalLights.value=U.state.directional,ye.directionalLightShadows.value=U.state.directionalShadow,ye.spotLights.value=U.state.spot,ye.spotLightShadows.value=U.state.spotShadow,ye.rectAreaLights.value=U.state.rectArea,ye.ltc_1.value=U.state.rectAreaLTC1,ye.ltc_2.value=U.state.rectAreaLTC2,ye.pointLights.value=U.state.point,ye.pointLightShadows.value=U.state.pointShadow,ye.hemisphereLights.value=U.state.hemi,ye.directionalShadowMatrix.value=U.state.directionalShadowMatrix,ye.spotLightMatrix.value=U.state.spotLightMatrix,ye.spotLightMap.value=U.state.spotLightMap,ye.pointShadowMatrix.value=U.state.pointShadowMatrix),D.lightProbeGrid=T.state.lightProbeGridArray.length>0,D.currentProgram=Ie,D.uniformsList=null,Ie}function Ii(p){if(p.uniformsList===null){const A=p.currentProgram.getUniforms();p.uniformsList=Ma.seqWithValue(A.seq,p.uniforms)}return p.uniformsList}function Di(p,A){const k=H.get(p);k.outputColorSpace=A.outputColorSpace,k.batching=A.batching,k.batchingColor=A.batchingColor,k.instancing=A.instancing,k.instancingColor=A.instancingColor,k.instancingMorph=A.instancingMorph,k.skinning=A.skinning,k.morphTargets=A.morphTargets,k.morphNormals=A.morphNormals,k.morphColors=A.morphColors,k.morphTargetsCount=A.morphTargetsCount,k.numClippingPlanes=A.numClippingPlanes,k.numIntersection=A.numClipIntersection,k.vertexAlphas=A.vertexAlphas,k.vertexTangents=A.vertexTangents,k.toneMapping=A.toneMapping}function C(p,A){if(p.length===0)return null;if(p.length===1)return p[0].texture!==null?p[0]:null;_.setFromMatrixPosition(A.matrixWorld);for(let k=0,D=p.length;k<D;k++){const U=p[k];if(U.texture!==null&&U.boundingBox.containsPoint(_))return U}return null}function X(p,A,k,D,U){A.isScene!==!0&&(A=Rt),W.resetTextureUnits();const z=A.fog,ne=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?A.environment:null,ee=ie===null?N.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Mt.workingColorSpace,re=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap,j=le.get(D.envMap||ne,re),Te=D.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ie=!!k.attributes.tangent&&(!!D.normalMap||D.anisotropy>0),ye=!!k.morphAttributes.position,Xe=!!k.morphAttributes.normal,Ke=!!k.morphAttributes.color;let Qe=En;D.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Qe=N.toneMapping);const Ze=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,bt=Ze!==void 0?Ze.length:0,we=H.get(D),st=T.state.lights;if(ze===!0&&(Ye===!0||p!==fe)){const mt=p===fe&&D.id===me;Ue.setState(D,p,mt)}let He=!1;D.version===we.__version?(we.needsLights&&we.lightsStateVersion!==st.state.version||we.outputColorSpace!==ee||U.isBatchedMesh&&we.batching===!1||!U.isBatchedMesh&&we.batching===!0||U.isBatchedMesh&&we.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&we.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&we.instancing===!1||!U.isInstancedMesh&&we.instancing===!0||U.isSkinnedMesh&&we.skinning===!1||!U.isSkinnedMesh&&we.skinning===!0||U.isInstancedMesh&&we.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&we.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&we.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&we.instancingMorph===!1&&U.morphTexture!==null||we.envMap!==j||D.fog===!0&&we.fog!==z||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Ue.numPlanes||we.numIntersection!==Ue.numIntersection)||we.vertexAlphas!==Te||we.vertexTangents!==Ie||we.morphTargets!==ye||we.morphNormals!==Xe||we.morphColors!==Ke||we.toneMapping!==Qe||we.morphTargetsCount!==bt||!!we.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(He=!0):(He=!0,we.__version=D.version);let Ct=we.currentProgram;He===!0&&(Ct=Kn(D,A,U),B&&D.isNodeMaterial&&B.onUpdateProgram(D,Ct,we));let Vt=!1,nn=!1,dn=!1;const ft=Ct.getUniforms(),Lt=we.uniforms;if(m.useProgram(Ct.program)&&(Vt=!0,nn=!0,dn=!0),D.id!==me&&(me=D.id,nn=!0),we.needsLights){const mt=C(T.state.lightProbeGridArray,U);we.lightProbeGrid!==mt&&(we.lightProbeGrid=mt,nn=!0)}if(Vt||fe!==p){m.buffers.depth.getReversed()&&p.reversedDepth!==!0&&(p._reversedDepth=!0,p.updateProjectionMatrix()),ft.setValue(P,"projectionMatrix",p.projectionMatrix),ft.setValue(P,"viewMatrix",p.matrixWorldInverse);const On=ft.map.cameraPosition;On!==void 0&&On.setValue(P,xt.setFromMatrixPosition(p.matrixWorld)),M.logarithmicDepthBuffer&&ft.setValue(P,"logDepthBufFC",2/(Math.log(p.far+1)/Math.LN2)),(D.isMeshPhongMaterial||D.isMeshToonMaterial||D.isMeshLambertMaterial||D.isMeshBasicMaterial||D.isMeshStandardMaterial||D.isShaderMaterial)&&ft.setValue(P,"isOrthographic",p.isOrthographicCamera===!0),fe!==p&&(fe=p,nn=!0,dn=!0)}if(we.needsLights&&(st.state.directionalShadowMap.length>0&&ft.setValue(P,"directionalShadowMap",st.state.directionalShadowMap,W),st.state.spotShadowMap.length>0&&ft.setValue(P,"spotShadowMap",st.state.spotShadowMap,W),st.state.pointShadowMap.length>0&&ft.setValue(P,"pointShadowMap",st.state.pointShadowMap,W)),U.isSkinnedMesh){ft.setOptional(P,U,"bindMatrix"),ft.setOptional(P,U,"bindMatrixInverse");const mt=U.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),ft.setValue(P,"boneTexture",mt.boneTexture,W))}U.isBatchedMesh&&(ft.setOptional(P,U,"batchingTexture"),ft.setValue(P,"batchingTexture",U._matricesTexture,W),ft.setOptional(P,U,"batchingIdTexture"),ft.setValue(P,"batchingIdTexture",U._indirectTexture,W),ft.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&ft.setValue(P,"batchingColorTexture",U._colorsTexture,W));const Nn=k.morphAttributes;if((Nn.position!==void 0||Nn.normal!==void 0||Nn.color!==void 0)&&L.update(U,k,Ct),(nn||we.receiveShadow!==U.receiveShadow)&&(we.receiveShadow=U.receiveShadow,ft.setValue(P,"receiveShadow",U.receiveShadow)),(D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial)&&D.envMap===null&&A.environment!==null&&(Lt.envMapIntensity.value=A.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=a0()),nn){if(ft.setValue(P,"toneMappingExposure",N.toneMappingExposure),we.needsLights&&se(Lt,dn),z&&D.fog===!0&&Pe.refreshFogUniforms(Lt,z),Pe.refreshMaterialUniforms(Lt,D,oe,xe,T.state.transmissionRenderTarget[p.id]),we.needsLights&&we.lightProbeGrid){const mt=we.lightProbeGrid;Lt.probesSH.value=mt.texture,Lt.probesMin.value.copy(mt.boundingBox.min),Lt.probesMax.value.copy(mt.boundingBox.max),Lt.probesResolution.value.copy(mt.resolution)}Ma.upload(P,Ii(we),Lt,W)}if(D.isShaderMaterial&&D.uniformsNeedUpdate===!0&&(Ma.upload(P,Ii(we),Lt,W),D.uniformsNeedUpdate=!1),D.isSpriteMaterial&&ft.setValue(P,"center",U.center),ft.setValue(P,"modelViewMatrix",U.modelViewMatrix),ft.setValue(P,"normalMatrix",U.normalMatrix),ft.setValue(P,"modelMatrix",U.matrixWorld),D.uniformsGroups!==void 0){const mt=D.uniformsGroups;for(let On=0,oi=mt.length;On<oi;On++){const Xs=mt[On];ae.update(Xs,Ct),ae.bind(Xs,Ct)}}return Ct}function se(p,A){p.ambientLightColor.needsUpdate=A,p.lightProbe.needsUpdate=A,p.directionalLights.needsUpdate=A,p.directionalLightShadows.needsUpdate=A,p.pointLights.needsUpdate=A,p.pointLightShadows.needsUpdate=A,p.spotLights.needsUpdate=A,p.spotLightShadows.needsUpdate=A,p.rectAreaLights.needsUpdate=A,p.hemisphereLights.needsUpdate=A}function ce(p){return p.isMeshLambertMaterial||p.isMeshToonMaterial||p.isMeshPhongMaterial||p.isMeshStandardMaterial||p.isShadowMaterial||p.isShaderMaterial&&p.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(p,A,k){const D=H.get(p);D.__autoAllocateDepthBuffer=p.resolveDepthBuffer===!1,D.__autoAllocateDepthBuffer===!1&&(D.__useRenderToTexture=!1),H.get(p.texture).__webglTexture=A,H.get(p.depthTexture).__webglTexture=D.__autoAllocateDepthBuffer?void 0:k,D.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(p,A){const k=H.get(p);k.__webglFramebuffer=A,k.__useDefaultFramebuffer=A===void 0},this.setRenderTarget=function(p,A=0,k=0){ie=p,J=A,Y=k;let D=null,U=!1,z=!1;if(p){const ee=H.get(p);if(ee.__useDefaultFramebuffer!==void 0){m.bindFramebuffer(P.FRAMEBUFFER,ee.__webglFramebuffer),Ae.copy(p.viewport),De.copy(p.scissor),dt=p.scissorTest,m.viewport(Ae),m.scissor(De),m.setScissorTest(dt),me=-1;return}else if(ee.__webglFramebuffer===void 0)W.setupRenderTarget(p);else if(ee.__hasExternalTextures)W.rebindTextures(p,H.get(p.texture).__webglTexture,H.get(p.depthTexture).__webglTexture);else if(p.depthBuffer){const Te=p.depthTexture;if(ee.__boundDepthTexture!==Te){if(Te!==null&&H.has(Te)&&(p.width!==Te.image.width||p.height!==Te.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(p)}}const re=p.texture;(re.isData3DTexture||re.isDataArrayTexture||re.isCompressedArrayTexture)&&(z=!0);const j=H.get(p).__webglFramebuffer;p.isWebGLCubeRenderTarget?(Array.isArray(j[A])?D=j[A][k]:D=j[A],U=!0):p.samples>0&&W.useMultisampledRTT(p)===!1?D=H.get(p).__webglMultisampledFramebuffer:Array.isArray(j)?D=j[k]:D=j,Ae.copy(p.viewport),De.copy(p.scissor),dt=p.scissorTest}else Ae.copy(Fe).multiplyScalar(oe).floor(),De.copy(ht).multiplyScalar(oe).floor(),dt=Re;if(k!==0&&(D=te),m.bindFramebuffer(P.FRAMEBUFFER,D)&&m.drawBuffers(p,D),m.viewport(Ae),m.scissor(De),m.setScissorTest(dt),U){const ee=H.get(p.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+A,ee.__webglTexture,k)}else if(z){const ee=A;for(let re=0;re<p.textures.length;re++){const j=H.get(p.textures[re]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+re,j.__webglTexture,k,ee)}}else if(p!==null&&k!==0){const ee=H.get(p.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ee.__webglTexture,k)}me=-1},this.readRenderTargetPixels=function(p,A,k,D,U,z,ne,ee=0){if(!(p&&p.isWebGLRenderTarget)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let re=H.get(p).__webglFramebuffer;if(p.isWebGLCubeRenderTarget&&ne!==void 0&&(re=re[ne]),re){m.bindFramebuffer(P.FRAMEBUFFER,re);try{const j=p.textures[ee],Te=j.format,Ie=j.type;if(p.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ee),!M.textureFormatReadable(Te)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!M.textureTypeReadable(Ie)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}A>=0&&A<=p.width-D&&k>=0&&k<=p.height-U&&P.readPixels(A,k,D,U,be.convert(Te),be.convert(Ie),z)}finally{const j=ie!==null?H.get(ie).__webglFramebuffer:null;m.bindFramebuffer(P.FRAMEBUFFER,j)}}},this.readRenderTargetPixelsAsync=async function(p,A,k,D,U,z,ne,ee=0){if(!(p&&p.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let re=H.get(p).__webglFramebuffer;if(p.isWebGLCubeRenderTarget&&ne!==void 0&&(re=re[ne]),re)if(A>=0&&A<=p.width-D&&k>=0&&k<=p.height-U){m.bindFramebuffer(P.FRAMEBUFFER,re);const j=p.textures[ee],Te=j.format,Ie=j.type;if(p.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ee),!M.textureFormatReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!M.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ye=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,ye),P.bufferData(P.PIXEL_PACK_BUFFER,z.byteLength,P.STREAM_READ),P.readPixels(A,k,D,U,be.convert(Te),be.convert(Ie),0);const Xe=ie!==null?H.get(ie).__webglFramebuffer:null;m.bindFramebuffer(P.FRAMEBUFFER,Xe);const Ke=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Ml(P,Ke,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,ye),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,z),P.deleteBuffer(ye),P.deleteSync(Ke),z}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(p,A=null,k=0){const D=Math.pow(2,-k),U=Math.floor(p.image.width*D),z=Math.floor(p.image.height*D),ne=A!==null?A.x:0,ee=A!==null?A.y:0;W.setTexture2D(p,0),P.copyTexSubImage2D(P.TEXTURE_2D,k,0,0,ne,ee,U,z),m.unbindTexture()},this.copyTextureToTexture=function(p,A,k=null,D=null,U=0,z=0){let ne,ee,re,j,Te,Ie,ye,Xe,Ke;const Qe=p.isCompressedTexture?p.mipmaps[z]:p.image;if(k!==null)ne=k.max.x-k.min.x,ee=k.max.y-k.min.y,re=k.isBox3?k.max.z-k.min.z:1,j=k.min.x,Te=k.min.y,Ie=k.isBox3?k.min.z:0;else{const Lt=Math.pow(2,-U);ne=Math.floor(Qe.width*Lt),ee=Math.floor(Qe.height*Lt),p.isDataArrayTexture?re=Qe.depth:p.isData3DTexture?re=Math.floor(Qe.depth*Lt):re=1,j=0,Te=0,Ie=0}D!==null?(ye=D.x,Xe=D.y,Ke=D.z):(ye=0,Xe=0,Ke=0);const Ze=be.convert(A.format),bt=be.convert(A.type);let we;A.isData3DTexture?(W.setTexture3D(A,0),we=P.TEXTURE_3D):A.isDataArrayTexture||A.isCompressedArrayTexture?(W.setTexture2DArray(A,0),we=P.TEXTURE_2D_ARRAY):(W.setTexture2D(A,0),we=P.TEXTURE_2D),m.activeTexture(P.TEXTURE0),m.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,A.flipY),m.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),m.pixelStorei(P.UNPACK_ALIGNMENT,A.unpackAlignment);const st=m.getParameter(P.UNPACK_ROW_LENGTH),He=m.getParameter(P.UNPACK_IMAGE_HEIGHT),Ct=m.getParameter(P.UNPACK_SKIP_PIXELS),Vt=m.getParameter(P.UNPACK_SKIP_ROWS),nn=m.getParameter(P.UNPACK_SKIP_IMAGES);m.pixelStorei(P.UNPACK_ROW_LENGTH,Qe.width),m.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Qe.height),m.pixelStorei(P.UNPACK_SKIP_PIXELS,j),m.pixelStorei(P.UNPACK_SKIP_ROWS,Te),m.pixelStorei(P.UNPACK_SKIP_IMAGES,Ie);const dn=p.isDataArrayTexture||p.isData3DTexture,ft=A.isDataArrayTexture||A.isData3DTexture;if(p.isDepthTexture){const Lt=H.get(p),Nn=H.get(A),mt=H.get(Lt.__renderTarget),On=H.get(Nn.__renderTarget);m.bindFramebuffer(P.READ_FRAMEBUFFER,mt.__webglFramebuffer),m.bindFramebuffer(P.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let oi=0;oi<re;oi++)dn&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,H.get(p).__webglTexture,U,Ie+oi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,H.get(A).__webglTexture,z,Ke+oi)),P.blitFramebuffer(j,Te,ne,ee,ye,Xe,ne,ee,P.DEPTH_BUFFER_BIT,P.NEAREST);m.bindFramebuffer(P.READ_FRAMEBUFFER,null),m.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(U!==0||p.isRenderTargetTexture||H.has(p)){const Lt=H.get(p),Nn=H.get(A);m.bindFramebuffer(P.READ_FRAMEBUFFER,$),m.bindFramebuffer(P.DRAW_FRAMEBUFFER,V);for(let mt=0;mt<re;mt++)dn?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Lt.__webglTexture,U,Ie+mt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Lt.__webglTexture,U),ft?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Nn.__webglTexture,z,Ke+mt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Nn.__webglTexture,z),U!==0?P.blitFramebuffer(j,Te,ne,ee,ye,Xe,ne,ee,P.COLOR_BUFFER_BIT,P.NEAREST):ft?P.copyTexSubImage3D(we,z,ye,Xe,Ke+mt,j,Te,ne,ee):P.copyTexSubImage2D(we,z,ye,Xe,j,Te,ne,ee);m.bindFramebuffer(P.READ_FRAMEBUFFER,null),m.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ft?p.isDataTexture||p.isData3DTexture?P.texSubImage3D(we,z,ye,Xe,Ke,ne,ee,re,Ze,bt,Qe.data):A.isCompressedArrayTexture?P.compressedTexSubImage3D(we,z,ye,Xe,Ke,ne,ee,re,Ze,Qe.data):P.texSubImage3D(we,z,ye,Xe,Ke,ne,ee,re,Ze,bt,Qe):p.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,z,ye,Xe,ne,ee,Ze,bt,Qe.data):p.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,z,ye,Xe,Qe.width,Qe.height,Ze,Qe.data):P.texSubImage2D(P.TEXTURE_2D,z,ye,Xe,ne,ee,Ze,bt,Qe);m.pixelStorei(P.UNPACK_ROW_LENGTH,st),m.pixelStorei(P.UNPACK_IMAGE_HEIGHT,He),m.pixelStorei(P.UNPACK_SKIP_PIXELS,Ct),m.pixelStorei(P.UNPACK_SKIP_ROWS,Vt),m.pixelStorei(P.UNPACK_SKIP_IMAGES,nn),z===0&&A.generateMipmaps&&P.generateMipmap(we),m.unbindTexture()},this.initRenderTarget=function(p){H.get(p).__webglFramebuffer===void 0&&W.setupRenderTarget(p)},this.initTexture=function(p){p.isCubeTexture?W.setTextureCube(p,0):p.isData3DTexture?W.setTexture3D(p,0):p.isDataArrayTexture||p.isCompressedArrayTexture?W.setTexture2DArray(p,0):W.setTexture2D(p,0),m.unbindTexture()},this.resetState=function(){J=0,Y=0,ie=null,m.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return js}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}}const r0=3.5,o0=7,ao=.55,so=3.1,c0=2,l0=3.5,ro=2.2,d0=.9,oo=.6,la=1.8,f0=3,co=7.5;class u0{constructor(e,t){this.h=t,this.delay=7,this.phase="idle",this.t=0,this.campT=0,this.anchor=new he(0,-999,0),this.pos=new he,this.ground=0,this.cloud=new un,this.cloudMat=new en({color:3488328,roughness:1,flatShading:!0,transparent:!0,opacity:0}),this.ringMat=new Xt({color:2106414,transparent:!0,opacity:0,depthWrite:!1}),this.bolt=new un,this.boltMat=new Xt({color:16774824}),this.glowMat=new Xt({color:16769357,transparent:!0,opacity:.45,depthWrite:!1}),this.perch=!1;const i=new Jn(1,1);for(const[a,r,o,c]of[[0,0,0,1.5],[1.4,-.2,.3,1.1],[-1.3,-.1,-.2,1.2],[.3,.5,-.9,1],[-.4,-.3,1,.9]]){const l=new ot(i,this.cloudMat);l.position.set(a,r,o),l.scale.setScalar(c),this.cloud.add(l)}this.cloud.visible=!1,e.add(this.cloud),this.ring=new ot(new Fc(la*.15,la,40),this.ringMat),this.ring.rotation.x=-Math.PI/2,this.ring.renderOrder=2,this.ring.visible=!1,e.add(this.ring);const s=new Dn(1,1,1);for(let a=0;a<6;a++){const r=new ot(s,this.boltMat),o=new ot(s,this.glowMat);r.add(o),o.scale.set(3,3,1),this.bolt.add(r)}this.bolt.visible=!1,e.add(this.bolt)}info(){return{phase:this.phase,x:this.pos.x,z:this.pos.z}}reset(){this.phase="idle",this.campT=0,this.anchor.set(0,-999,0),this.cloud.visible=this.ring.visible=this.bolt.visible=!1}update(e,t){if(this.t+=e,this.phase==="idle"){const i=this.h.perched?.()??!1;Math.hypot(t.x-this.anchor.x,t.z-this.anchor.z)>(i?o0:r0)?(this.anchor.copy(t),this.campT=0):(this.campT+=e)>=this.delay*(i?ao:1)&&this.begin(t,i);return}if(this.phase==="gather"){const i=t.x-this.pos.x,s=t.z-this.pos.z,a=Math.hypot(i,s),r=Math.min(a,f0*e);a>.001&&(this.pos.x+=i/a*r,this.pos.z+=s/a*r),this.ground=this.h.impactAt(this.pos.x,this.pos.z);const o=Math.min(1,this.t/ro);this.cloudMat.opacity=.95*o,this.ringMat.color.setHex(2106414),this.ringMat.opacity=.35*o,this.t>=ro&&(this.phase="lock",this.t=0)}else if(this.phase==="lock"){const i=Math.sin(this.t*(10+this.t*30))>0;this.ringMat.color.setHex(i?16769357:16751130),this.ringMat.opacity=.75,this.t>=d0&&this.fire()}else this.phase==="flash"&&(this.bolt.visible=this.t<.18&&Math.floor(this.t*40)%3!==2,this.cloudMat.opacity=.95*Math.max(0,1-this.t/oo),this.ringMat.opacity=.6*Math.max(0,1-this.t/.3),this.t>=oo&&(this.cloud.visible=this.ring.visible=this.bolt.visible=!1,this.phase="idle",this.campT=Math.max(0,this.delay*(this.perch?ao:1)-(this.perch?c0:l0))));this.cloud.position.set(this.pos.x,this.ground+co+Math.sin(this.t*2)*.15,this.pos.z),this.cloud.rotation.y+=e*.3,this.ring.position.set(this.pos.x,this.ground+.06,this.pos.z)}begin(e,t=!1){this.perch=t,this.ring.scale.setScalar(t?so/la:1),this.phase="gather",this.t=0,this.pos.copy(e),this.ground=this.h.impactAt(e.x,e.z),this.cloud.visible=this.ring.visible=!0,this.h.gather(e.x,e.z)}fire(){this.phase="flash",this.t=0;const e=this.ground+co-.8,t=this.bolt.children.length,i=[];for(let s=0;s<=t;s++){const a=s/t,r=s===0||s===t?0:.9;i.push(new he(this.pos.x+(Math.random()-.5)*r,e+(this.ground-e)*a,this.pos.z+(Math.random()-.5)*r))}this.bolt.children.forEach((s,a)=>{const r=i[a],o=i[a+1];s.position.copy(r).add(o).multiplyScalar(.5),s.lookAt(o),s.scale.set(.16,.16,r.distanceTo(o)+.1)}),this.bolt.visible=!0,this.h.strike(this.pos.x,this.ground,this.pos.z,this.perch?so:la)}}class h0 extends kc{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Dn;e.deleteAttribute("uv");const t=new en({side:qt}),i=new en,s=new Bc(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const a=new ot(e,t);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);const r=new an(e,i,6),o=new ea;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),r.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),r.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),r.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),r.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),r.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),r.setMatrixAt(5,o.matrix),this.add(r);const c=new ot(e,li(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new ot(e,li(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const d=new ot(e,li(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const h=new ot(e,li(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const u=new ot(e,li(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const v=new ot(e,li(100));v.position.set(0,20,0),v.scale.set(1,.1,1),this.add(v)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function li(n){return new zs({color:0,emissive:16777215,emissiveIntensity:n})}const Fi=new he;function sn(n,e,t,i,s,a){const r=2*Math.PI*s/4,o=Math.max(a-2*s,0),c=Math.PI/4;Fi.copy(e),Fi[i]=0,Fi.normalize();const l=.5*r/(r+o),d=1-Fi.angleTo(n)/c;return Math.sign(Fi[t])===1?d*l:o/(r+o)+l+l*(1-d)}class Fa extends Dn{constructor(e=1,t=1,i=1,s=2,a=.1){const r=s*2+1;if(a=Math.min(e/2,t/2,i/2,a),super(1,1,1,r,r,r),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:s,radius:a},r===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new he,l=new he,d=new he(e,t,i).divideScalar(2).subScalar(a),h=this.attributes.position.array,u=this.attributes.normal.array,v=this.attributes.uv.array,b=h.length/6,S=new he,g=.5/r;for(let f=0,E=0;f<h.length;f+=3,E+=2)switch(c.fromArray(h,f),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),h[f+0]=d.x*Math.sign(c.x)+l.x*a,h[f+1]=d.y*Math.sign(c.y)+l.y*a,h[f+2]=d.z*Math.sign(c.z)+l.z*a,u[f+0]=l.x,u[f+1]=l.y,u[f+2]=l.z,Math.floor(f/b)){case 0:S.set(1,0,0),v[E+0]=sn(S,l,"z","y",a,i),v[E+1]=1-sn(S,l,"y","z",a,t);break;case 1:S.set(-1,0,0),v[E+0]=1-sn(S,l,"z","y",a,i),v[E+1]=1-sn(S,l,"y","z",a,t);break;case 2:S.set(0,1,0),v[E+0]=1-sn(S,l,"x","z",a,e),v[E+1]=sn(S,l,"z","x",a,i);break;case 3:S.set(0,-1,0),v[E+0]=1-sn(S,l,"x","z",a,e),v[E+1]=1-sn(S,l,"z","x",a,i);break;case 4:S.set(0,0,1),v[E+0]=1-sn(S,l,"x","y",a,e),v[E+1]=1-sn(S,l,"y","x",a,t);break;case 5:S.set(0,0,-1),v[E+0]=sn(S,l,"x","y",a,e),v[E+1]=1-sn(S,l,"y","x",a,t);break}}static fromJSON(e){return new Fa(e.width,e.height,e.depth,e.segments,e.radius)}}function Li(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),a={},r={},o=n[0].morphTargetsRelative,c=new Ri;let l=0;for(let d=0;d<n.length;++d){const h=n[d];let u=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const v in h.attributes){if(!i.has(v))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+v+'" attribute exists among all geometries, or in none of them.'),null;a[v]===void 0&&(a[v]=[]),a[v].push(h.attributes[v]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const v in h.morphAttributes){if(!s.has(v))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;r[v]===void 0&&(r[v]=[]),r[v].push(h.morphAttributes[v])}if(e){let v;if(t)v=h.index.count;else if(h.attributes.position!==void 0)v=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,v,d),l+=v}}if(t){let d=0;const h=[];for(let u=0;u<n.length;++u){const v=n[u].index;for(let b=0;b<v.count;++b)h.push(v.getX(b)+d);d+=n[u].attributes.position.count}c.setIndex(h)}for(const d in a){const h=lo(a[d]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,h)}for(const d in r){const h=r[d][0].length;if(h!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<h;++u){const v=[];for(let S=0;S<r[d].length;++S)v.push(r[d][S][u]);const b=lo(v);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(b)}}}return c}function lo(n){let e,t,i,s=-1,a=0;for(let l=0;l<n.length;++l){const d=n[l];if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;a+=d.count*t}const r=new e(a),o=new Gt(r,t,i);let c=0;for(let l=0;l<n.length;++l){const d=n[l];if(d.isInterleavedBufferAttribute){const h=c/t;for(let u=0,v=d.count;u<v;u++)for(let b=0;b<t;b++){const S=d.getComponent(u,b);o.setComponent(u+h,b,S)}}else r.set(d.array,c);c+=d.count*t}return s!==void 0&&(o.gpuType=s),o}function fo(n,e){if(e===Dd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Ss||e===Gc){let t=n.getIndex();if(t===null){const r=[],o=n.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)r.push(c);n.setIndex(r),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=t.count-2,s=[];if(e===Ss)for(let r=1;r<=i;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const a=n.clone();return a.setIndex(s),a.clearGroups(),a}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}const Qc={skyTop:3114736,skyBottom:15135743,ground:6076508,fog:14478591};function p0(n,e=Qc){const t=new URLSearchParams(location.search).get("aa"),i=screen.width*screen.height<=1600*900,s=new s0({antialias:t!==null?t==="1":devicePixelRatio<1.5&&(i||Ud()),alpha:!1,powerPreference:"high-performance"});bn.guess(s),s.debug.checkShaderErrors=!1,s.shadowMap.enabled=bn.preset.shadows,s.shadowMap.type=Ki,s.outputColorSpace=Ht,s.toneMapping=Hs,s.toneMappingExposure=1,n.appendChild(s.domElement);const a=new kc;a.fog=new Nd(e.fog,55,230);const r=m0(e.skyTop,e.fog);a.add(r);const c=new ws(s).fromScene(new h0,.04).texture;a.environmentIntensity=.45;const l=new Od(12574975,16773336,.9);a.add(l);const d=b=>{const S=b.name==="high";a.environment=S?c:null,l.intensity=S?.9:1.5};d(bn.preset);const h=new Hc(16773596,3);h.position.set(25,45,18),h.castShadow=bn.preset.shadows,h.shadow.mapSize.setScalar(bn.preset.shadowMap||1024);const u=h.shadow.camera;u.left=-18,u.right=18,u.top=18,u.bottom=-18,u.near=1,u.far=140,h.shadow.bias=-4e-4,h.shadow.normalBias=.03,a.add(h,h.target),e.cloudSea&&g0(a),_0(a);const v=h.position.clone();return bn.onChange(b=>{const S=s.shadowMap.enabled,g=a.environment!==null;d(b),s.shadowMap.enabled=b.shadows,h.castShadow=b.shadows,b.shadows&&h.shadow.mapSize.x!==b.shadowMap&&(h.shadow.map?.dispose(),h.shadow.map=null,h.shadow.mapSize.setScalar(b.shadowMap)),(S!==b.shadows||g!==(a.environment!==null))&&a.traverse(f=>{const E=f.material;for(const y of E?Array.isArray(E)?E:[E]:[])y.needsUpdate=!0})}),{renderer:s,scene:a,sun:h,followShadow(b){h.position.copy(b).add(v),h.target.position.copy(b),r.position.copy(b)},setSky(b,S){const g=r.material.uniforms;g.top.value.setHex(b),g.hor.value.setHex(S),a.fog.color.setHex(S)},shadowArea(b,S){h.position.copy(b).add(v),h.target.position.copy(b),r.position.copy(b),u.left=-S,u.right=S,u.top=S,u.bottom=-S,u.updateProjectionMatrix()}}}function m0(n,e){const t=new wn({uniforms:{top:{value:new Be(n)},hor:{value:new Be(e)}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:["uniform vec3 top; uniform vec3 hor; varying vec3 vDir;","void main(){ float k = smoothstep(0.0, 0.55, vDir.y); gl_FragColor = vec4(mix(hor, top, pow(k, 0.8)), 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`),side:qt,depthWrite:!1,fog:!1}),i=new ot(new _i(420,32,16),t);return i.renderOrder=1,i.frustumCulled=!1,i}const el=new zs({color:16777215,emissive:14543359,emissiveIntensity:.55});function Sa(n,e){const t=new an(new Jn(1,1),el,e.length),i=new Qt;e.forEach((s,a)=>t.setMatrixAt(a,i.compose(s.p,new Ua,new he(s.r,s.r*.75,s.r)))),n.add(t)}function g0(n){const e=new ot(new Wn(8e3,8e3),el);e.rotation.x=-Math.PI/2,e.position.y=tl,n.add(e)}const tl=-40;function v0(n,e,t=!0){const i=[],s=[],a=[],r=(o,c)=>o+Math.random()*(c-o);for(const o of e){if(t)for(let c=0;c<14;c++)i.push({p:new he(o.x+r(-140,140),tl+r(0,4),o.z+r(-20,20)),r:r(9,16)});for(let c=0;c<2;c++){const l=Math.random()<.5?-1:1,d=o.x+l*r(7,18),h=o.y-r(6,14),u=o.z+r(-8,8);for(let v=0;v<3+(Math.random()*2|0);v++)s.push({p:new he(d+r(-2.5,2.5),h+r(-.6,.6),u+r(-1.5,1.5)),r:r(1.6,2.8)})}if(Math.random()<.5){const c=o.x+r(-90,90),l=o.y+r(30,55),d=o.z+r(-30,30);for(let h=0;h<5;h++)a.push({p:new he(c+(h-2)*4.5,l+r(0,2),d+r(0,3)),r:r(4,7)})}}i.length&&Sa(n,i),Sa(n,s),a.length&&Sa(n,a)}function _0(n){const e=[];for(let t=0;t<14;t++){const i=Math.random()*Math.PI*2,s=90+Math.random()*90,a=Math.cos(i)*s,r=Math.sin(i)*s-40,o=30+Math.random()*35,c=4+(Math.random()*4|0);for(let l=0;l<c;l++){const d=4+Math.random()*4;e.push({p:new he(a+(l-c/2)*4.5,o+Math.random()*3-(l===0||l===c-1?1.5:0),r+Math.random()*4),r:d})}}Sa(n,e)}const uo=new Map,ho=new Map;function es(n,e){const t=`${n.x}|${n.y}|${n.z}`;let i=uo.get(t);if(!i){const a=Math.min(.18,Math.min(n.x,n.y,n.z)*.2);i=new Fa(n.x,n.y,n.z,2,a),uo.set(t,i)}const s=new ot(i,nl(e));return s.castShadow=s.receiveShadow=!0,s}function nl(n){let e=ho.get(n);return e||(e=new en({color:n,roughness:.32}),ho.set(n,e)),e}function x0(n){const e=n.attributes.position,t=n.attributes.normal,i=new Float32Array(e.count*2);for(let s=0;s<e.count;s++){const a=Math.abs(t.getX(s)),r=Math.abs(t.getY(s)),o=Math.abs(t.getZ(s)),c=e.getX(s),l=e.getY(s),d=e.getZ(s);r>=a&&r>=o?(i[s*2]=c,i[s*2+1]=d):a>=o?(i[s*2]=d,i[s*2+1]=l):(i[s*2]=c,i[s*2+1]=l)}n.setAttribute("uv",new Gt(i,2))}function po(n,e,t=!1){const i=new Map;for(const s of e){s.updateWorldMatrix(!0,!1);const a=s.geometry.clone().applyMatrix4(s.matrixWorld);t&&!s.userData.ownUV&&x0(a);const r=s.material;i.has(r)||i.set(r,[]),i.get(r).push(a),s.removeFromParent()}for(const[s,a]of i){const r=new ot(Li(a),s);r.castShadow=r.receiveShadow=!0,n.add(r),a.forEach(o=>o.dispose())}}const Ca={player:{value:new he(0,-999,0)},cam:{value:new he}},mo=1.6,b0=.5,go=new Map;function il(n){let e=go.get(n);return e||(e=n.clone(),e.onBeforeCompile=t=>{t.uniforms.uOccP=Ca.player,t.uniforms.uOccC=Ca.cam,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vOccW;`).replace("#include <project_vertex>",`#include <project_vertex>
vOccW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vOccW;
uniform vec3 uOccP, uOccC;
float occBayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0)), i = x + y * 4;
  int b[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(b[i]) + 0.5) / 16.0;
}`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
{
  vec3 seg = uOccP - uOccC;
  float L = length(seg);
  float s = dot(vOccW - uOccC, seg / L);
  // только то, что ближе к камере, чем игрок (минус 0,8 м — пол под ногами не трогаем)
  if (s > 0.0 && s < L - 0.8) {
    float d = distance(vOccW, uOccC + seg / L * s);
    float k = ${b0.toFixed(2)} * smoothstep(${mo.toFixed(2)}, ${(mo*.55).toFixed(2)}, d);
    if (occBayer(gl_FragCoord.xy) < k) discard;
  }
}`)},e.customProgramCacheKey=()=>"occl",go.set(n,e),e)}function M0(n,e){Ca.player.value.set(n.x,n.y+1,n.z),Ca.cam.value.set(e.x,e.y,e.z)}const S0={grass:4,dirt:3,stone:2.5,planks:1,bark:1.5,leaves:2,wood:1.2,sand:5,sandstone:3,palmbark:1.2,palmleaf:1.6,cactus:1.2};function E0(n,e){return new Promise(t=>{const i=new Image;i.onload=()=>{const s=document.createElement("canvas");s.width=s.height=16;const a=s.getContext("2d");a.drawImage(i,0,0,16,16);const r=a.getImageData(0,0,16,16).data;let o=0,c=0,l=0;for(let v=0;v<r.length;v+=4)o+=r[v],c+=r[v+1],l+=r[v+2];const d=r.length/4,h=new Be().setRGB(o/d/255,c/d/255,l/d/255,Ht),u=new Ra(i);u.colorSpace=Ht,u.wrapS=u.wrapT=ii,u.repeat.setScalar(1/S0[n]),u.anisotropy=e,u.needsUpdate=!0,t({tex:u,mean:h})},i.onerror=()=>t(null),i.src=`./assets/tex/${n}.webp?v=mwpzjthk`})}async function T0(n,e=4){const t=[...new Set(Object.values(n))],i=new Map;await Promise.all(t.map(async s=>{const a=await E0(s,e);a&&i.set(s,a)}));for(const[s,a]of Object.entries(n)){const r=i.get(a);if(!r)continue;const o=Number(s),c=new Be(o),l=new Be(Math.max(.2,c.r/Math.max(.02,r.mean.r)),Math.max(.2,c.g/Math.max(.02,r.mean.g)),Math.max(.2,c.b/Math.max(.02,r.mean.b))),d=nl(o);for(const h of[d,il(d)])h.map=r.tex,h.color.copy(l),h.roughness=.6,h.needsUpdate=!0}}const al={skin:16175162,shirt:2060256,pants:3453770,shoes:3453770,sleeve:0,hair:"none",face:"smile"},G=.5,Cn=2*G,ki=2*G,Ea=.6*G,$i=1.2*G,sl=.24*G,Rs=.035,vo=new Map;function Vn(n,e){let t=vo.get(n);return t||(t=e(),vo.set(n,t)),t}const rt=(n,e,t,i)=>Vn(`b${n}|${e}|${t}|${i}`,()=>new Fa(n,e,t,2,i));function w0(){return Vn("cylhead",()=>{const n=Ea,e=$i,t=sl,i=[new Ut(0,-e/2)],s=10;for(let a=0;a<=s;a++){const r=-Math.PI/2+a/s*(Math.PI/2);i.push(new Ut(n-t+Math.cos(r)*t,-e/2+t+Math.sin(r)*t))}for(let a=0;a<=s;a++){const r=a/s*(Math.PI/2);i.push(new Ut(n-t+Math.cos(r)*t,e/2-t+Math.sin(r)*t))}return i.push(new Ut(0,e/2)),new kd(i,48)})}const _o=new Map;function rl(n){let e=_o.get(n);if(e)return e;const t=document.createElement("canvas");t.width=t.height=256;const i=t.getContext("2d"),s="#151515";if(i.fillStyle=s,i.strokeStyle=s,i.lineCap="round",i.lineJoin="round",n==="cool")i.beginPath(),i.roundRect(46,84,164,40,14),i.fill(),i.fillStyle="rgba(255,255,255,0.55)",i.fillRect(64,92,30,7);else for(const a of[92,164])i.fillStyle=s,i.beginPath(),i.ellipse(a,100,13,21,0,0,Math.PI*2),i.fill(),i.fillStyle="#fff",i.beginPath(),i.arc(a-4,92,5,0,Math.PI*2),i.fill();return i.fillStyle=s,i.lineWidth=11,i.beginPath(),n==="grin"||n==="happy"?(i.moveTo(80,146),i.quadraticCurveTo(128,214,176,146),i.closePath(),i.fillStyle=n==="grin"?"#fff":"#7a2430",i.fill(),i.stroke()):(i.arc(128,132,46,.22*Math.PI,.78*Math.PI),i.stroke()),e=new pn(t),e.colorSpace=Ht,e.anisotropy=4,_o.set(n,e),e}const xo=new Map;function y0(n){let e=xo.get(n);return e||(e=new en({color:n,roughness:.45}),xo.set(n,e)),e}function qe(n,e,t=0,i=0,s=0){const a=new ot(n,y0(e));return a.position.set(t,i,s),a.castShadow=!0,a}function bo(n,e,t){const i=new un,s=G*.97,a=Math.max(0,Math.min(Cn,t));return a<Cn&&i.add(qe(rt(s,Cn-a,G,Rs),n,0,-(Cn-a)/2)),a>0&&i.add(qe(rt(s,a,G,Rs),e,0,-Cn+a/2)),i}function A0(n){const e=new Map;n.updateMatrixWorld(!0),n.traverse(i=>{const s=i;if(!s.isMesh)return;const a=s.geometry.index?s.geometry.toNonIndexed():s.geometry.clone();a.applyMatrix4(s.matrix);for(const o of Object.keys(a.attributes))o!=="position"&&o!=="normal"&&a.deleteAttribute(o);const r=s.material;e.has(r)||e.set(r,[]),e.get(r).push(a)});const t=new un;for(const[i,s]of e){const a=new ot(Li(s),i);a.castShadow=!0,t.add(a)}return t}function R0(n,e,t){const i=new un,s=$i/2;switch(n){case"short":i.add(qe(rt(1.36*G,.42*G,1.36*G,.18),e,0,s-.02)),i.add(qe(rt(1.36*G,.7*G,.36*G,.14),e,0,s-.25*G,-.52*G));break;case"spiky":i.add(qe(rt(1.34*G,.36*G,1.34*G,.16),e,0,s-.02));for(let a=0;a<7;a++){const r=a/7*Math.PI*2,o=qe(Vn("spike",()=>new Bd(.2*G,.6*G,5)),e,Math.cos(r)*.35*G,s+.3*G,Math.sin(r)*.35*G-.05);o.rotation.set(Math.sin(r)*.5,0,-Math.cos(r)*.5),i.add(o)}break;case"long":i.add(qe(rt(1.4*G,.44*G,1.4*G,.2),e,0,s-.02)),i.add(qe(rt(1.42*G,1.9*G,.42*G,.16),e,0,s-.95*G,-.52*G));for(const a of[-.6,.6])i.add(qe(rt(.24*G,1.1*G,1*G,.1),e,a*G,s-.55*G,-.1*G));break;case"ponytail":i.add(qe(rt(1.4*G,.44*G,1.4*G,.2),e,0,s-.02)),i.add(qe(rt(1.42*G,.8*G,.4*G,.14),e,0,s-.35*G,-.52*G)),i.add(qe(rt(.3*G,.3*G,.3*G,.1),t,0,s+.05*G,-.8*G)),i.add(qe(rt(.42*G,1.3*G,.42*G,.16),e,0,s-.6*G,-.95*G));break;case"pigtails":i.add(qe(rt(1.4*G,.44*G,1.4*G,.2),e,0,s-.02)),i.add(qe(rt(1.42*G,.8*G,.4*G,.14),e,0,s-.35*G,-.52*G));for(const a of[-1,1])i.add(qe(rt(.3*G,.3*G,.3*G,.1),t,a*.78*G,s-.1*G,-.25*G)),i.add(qe(rt(.4*G,1.1*G,.4*G,.16),e,a*.95*G,s-.65*G,-.25*G));break;case"bun":i.add(qe(rt(1.38*G,.42*G,1.38*G,.2),e,0,s-.02)),i.add(qe(rt(1.4*G,.6*G,.38*G,.14),e,0,s-.25*G,-.52*G)),i.add(qe(Vn("bun",()=>new _i(.4*G,16,10)),e,0,s+.45*G,-.15*G)),i.add(qe(rt(.7*G,.14*G,.7*G,.05),t,0,s+.18*G,-.15*G));break;case"bob":i.add(qe(rt(1.44*G,.46*G,1.44*G,.2),e,0,s-.02)),i.add(qe(rt(1.46*G,1*G,.42*G,.16),e,0,s-.45*G,-.52*G));for(const a of[-.62,.62])i.add(qe(rt(.26*G,.95*G,1.1*G,.1),e,a*G,s-.42*G,-.05*G));i.add(qe(rt(1.3*G,.3*G,.2*G,.08),e,0,s-.12*G,.62*G));break;case"bow":i.add(qe(rt(1.4*G,.44*G,1.4*G,.2),e,0,s-.02)),i.add(qe(rt(1.42*G,1.9*G,.42*G,.16),e,0,s-.95*G,-.52*G));for(const a of[-.6,.6])i.add(qe(rt(.24*G,1.1*G,1*G,.1),e,a*G,s-.55*G,-.1*G));for(const a of[-1,1])i.add(qe(rt(.45*G,.4*G,.2*G,.12),t,a*.32*G,s+.28*G,.1*G));i.add(qe(rt(.2*G,.22*G,.22*G,.06),t,0,s+.28*G,.1*G));break;case"cap":i.add(qe(rt(1.4*G,.5*G,1.4*G,.22),t,0,s+.05)),i.add(qe(rt(1.1*G,.08*G,.7*G,.03),t,0,s-.12*G,.85*G));break;case"beanie":i.add(qe(Vn("beanie",()=>new _i(.72*G,24,12,0,Math.PI*2,0,Math.PI/2)),t,0,s-.12*G)),i.add(qe(Vn("pom",()=>new _i(.18*G,12,8)),t,0,s+.62*G));break}return i}const Mo=new Map;function C0(n){let e=Mo.get(n);if(e)return e;const t=document.createElement("canvas");t.width=512,t.height=256;const i=t.getContext("2d");i.fillStyle="#fff",i.fillRect(0,0,512,256),i.drawImage(rl(n).image,0,0,256,256);const s=new pn(t);return s.colorSpace=Ht,s.anisotropy=4,e=new en({map:s,vertexColors:!0,roughness:.45}),Mo.set(n,e),e}const L0=new Fd(.8,20),P0=(()=>{const n=document.createElement("canvas");n.width=n.height=64;const e=n.getContext("2d"),t=e.createRadialGradient(32,32,4,32,32,32);return t.addColorStop(0,"rgba(0,0,0,.45)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new Xt({map:new pn(n),transparent:!0,depthWrite:!1})})(),Ia=class Ia{constructor(e=al,t=!1){this.root=new un,this.body=new kn,this.torso=new kn,this.armL=new kn,this.armR=new kn,this.legL=new kn,this.legR=new kn,this.head=new kn,this.state="idle",this.t=Math.random()*10,this.cur={arm:0,leg:0,armUp:0,bob:0,lean:0},this.cheap=t;const i=e.shoes??2829104,s=e.sleeve??.35;this.root.add(this.body);for(const[l,d]of[[this.legL,-.5*G],[this.legR,.5*G]])l.position.set(d,Cn,0),l.add(bo(e.pants,i,.32*G)),this.body.add(l);this.torso.position.y=Cn,this.body.add(this.torso),this.torso.add(qe(rt(2*G,ki,G,Rs),e.shirt,0,ki/2));for(const[l,d]of[[this.armL,-1.5*G],[this.armR,1.5*G]]){l.position.set(d,ki-.25*G,0);const h=bo(e.shirt,e.skin,Cn*(1-s));h.position.y=.25*G,l.add(h),this.torso.add(l)}this.head.position.y=ki;const a=.11*G;this.head.add(qe(Vn("neck",()=>new xn(.15*G,.15*G,a+.06,20)),e.skin,0,a/2));const r=a+$i/2;this.head.add(qe(w0(),e.skin,0,r));const o=new ot(Vn("face",()=>new xn(Ea+.003,Ea+.003,$i-2*sl+.08,32,1,!0,-.85,1.7)),new en({map:rl(e.face??"smile"),transparent:!0,roughness:.5,depthWrite:!1}));o.position.y=r,o.userData.face=!0,this.head.add(o);const c=A0(R0(e.hair??"none",e.hairColor??3810324,e.hat??14168378));if(c.scale.setScalar(Ea/(.62*G)),c.position.y=r,this.head.add(c),this.torso.add(this.head),this.skin(e,!t),t){const l=new ot(L0,P0);l.rotation.x=-Math.PI/2,l.position.y=.03,l.renderOrder=1,this.root.add(l)}}skin(e,t){const i=[this.body,this.torso,this.legL,this.legR,this.armL,this.armR,this.head];this.root.updateMatrixWorld(!0);const s=[],a=new Be,r=[];this.body.traverse(c=>{c.isMesh&&r.push(c)});for(const c of r){let l=c.parent;for(;l&&!i.includes(l);)l=l.parent;const d=i.indexOf(l),h=(c.geometry.index?c.geometry.toNonIndexed():c.geometry.clone()).applyMatrix4(c.matrixWorld),u=h.attributes.position.count,v=c.userData.face===!0;a.copy(v?new Be(e.skin):c.material.color);const b=new Float32Array(u*3),S=new Float32Array(u*2),g=new Uint16Array(u*4),f=new Float32Array(u*4),E=v?h.attributes.uv:null;for(let y=0;y<u;y++)b[y*3]=a.r,b[y*3+1]=a.g,b[y*3+2]=a.b,E?(S[y*2]=E.getX(y)*.5,S[y*2+1]=E.getY(y)):(S[y*2]=.75,S[y*2+1]=.5),g[y*4]=d,f[y*4]=1;for(const y of Object.keys(h.attributes))y!=="position"&&y!=="normal"&&h.deleteAttribute(y);h.setAttribute("color",new Gt(b,3)),h.setAttribute("uv",new Gt(S,2)),h.setAttribute("skinIndex",new Gt(g,4)),h.setAttribute("skinWeight",new Gt(f,4)),s.push(h),c.removeFromParent()}const o=new Es(Li(s),C0(e.face??"smile"));s.forEach(c=>c.dispose()),o.castShadow=t,this.root.add(o),this.root.updateMatrixWorld(!0),o.bind(new Ts(i))}setModel(e){const t=[this.body,this.torso,this.legL,this.legR,this.armL,this.armR,this.head];for(const a of[...this.root.children]){const r=a;r.isSkinnedMesh&&(r.skeleton.dispose(),this.root.remove(r))}for(const a of t)for(const r of[...a.children])r.userData.extra&&a.remove(r);for(const a of t)a.rotation.set(0,0,0);this.body.position.set(0,0,0);const i=e.pivots;this.legL.position.copy(i.legL),this.legR.position.copy(i.legR),this.torso.position.copy(i.torso),this.armL.position.subVectors(i.armL,i.torso),this.armR.position.subVectors(i.armR,i.torso),this.head.position.subVectors(i.head,i.torso);const s=new Es(e.geo,e.mat);s.castShadow=!this.cheap,s.frustumCulled=!1,this.root.add(s),this.root.updateMatrixWorld(!0),s.bind(new Ts(t));for(const a of e.extras){const r=new ot(a.geo,a.mat);r.userData.extra=!0,r.renderOrder=2,{body:this.body,torso:this.torso,legL:this.legL,legR:this.legR,armL:this.armL,armR:this.armR,head:this.head}[a.bone].add(r)}}setState(e){this.state=e}limp(e,t){this.t+=e;const i=Math.sin(this.t*17)*t,s=Math.cos(this.t*13)*t;this.armL.rotation.set(-1.2+i*.9,0,-1.1-s*.5),this.armR.rotation.set(-1.4-s*.9,0,1.1+i*.5),this.legL.rotation.set(.5+s*.7,0,-.35),this.legR.rotation.set(-.4-i*.7,0,.35),this.torso.rotation.set(.15*i,0,0),this.head.rotation.set(.3*s,.4*i,0),this.body.position.y=0}update(e,t=1){this.t+=e;const i=this.state,s=1-Math.exp(-e*14),a=this.t*12,r=i==="run"?Math.sin(a)*1.15*t:0,o={arm:i==="run"?r:i==="idle"?Math.sin(this.t*2)*.06:0,leg:i==="run"?r:i==="jump"?.7:i==="fall"?Math.sin(this.t*9)*.4:0,armUp:i==="jump"?2.7:i==="fall"?2.3+Math.sin(this.t*14)*.45:0,bob:i==="run"?Math.abs(Math.cos(a))*.14:i==="idle"?Math.sin(this.t*2)*.015:0,lean:i==="run"?.16*t:i==="fall"?-.15:0},c=this.cur;Object.keys(c).forEach(l=>{c[l]+=(o[l]-c[l])*s}),this.armL.rotation.set(c.arm-c.armUp,0,-c.armUp*.28),this.armR.rotation.set(-c.arm-c.armUp,0,c.armUp*.28),this.legL.rotation.x=-c.leg,this.legR.rotation.x=i==="jump"?-.35:c.leg,this.body.position.y=c.bob,this.torso.rotation.x=c.lean,this.torso.rotation.y=i==="run"?Math.sin(a)*.08:0,this.head.rotation.y=i==="idle"?Math.sin(this.t*.7)*.3:0}};Ia.HEIGHT=Cn+ki+.11*G+$i,Ia.WIDTH=2*G;let La=Ia;const I0=new Set(["KeyW","KeyA","KeyS","KeyD","KeyE","KeyQ","KeyR","KeyF","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","ShiftLeft","ShiftRight","Enter"]),D0=new Set(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);class U0{constructor(e){this.el=e,this.state={move:{x:0,y:0},jump:!1,look:{x:0,y:0},zoom:0,touch:!1},this.keys=new Set,this.touchJump=!1,this.stick=null,this.lookId=null,this.lookLast={x:0,y:0},this.mouseDown=!1,addEventListener("keydown",t=>{I0.has(t.code)&&(D0.has(t.code)&&t.preventDefault(),this.keys.add(t.code))}),addEventListener("keyup",t=>this.keys.delete(t.code)),addEventListener("blur",()=>{this.keys.clear(),this.mouseDown=!1}),document.addEventListener("contextmenu",t=>t.preventDefault()),e.addEventListener("mousedown",t=>{this.mouseDown=!0,this.lookLast={x:t.clientX,y:t.clientY}}),addEventListener("mouseup",()=>{this.mouseDown=!1}),addEventListener("mousemove",t=>{this.mouseDown&&(this.state.look.x+=t.clientX-this.lookLast.x,this.state.look.y+=t.clientY-this.lookLast.y,this.lookLast={x:t.clientX,y:t.clientY})}),e.addEventListener("wheel",t=>{t.target?.closest?.(".chr-overlay,.mnu-overlay")||(t.preventDefault(),this.state.zoom+=Math.sign(t.deltaY))},{passive:!1}),this.ui=document.createElement("div"),this.ui.className="touch-ui",this.base=ts("stick-base"),this.knob=ts("stick-knob"),this.base.appendChild(this.knob),this.jumpBtn=ts("jump-btn"),this.ui.append(this.base,this.jumpBtn),e.appendChild(this.ui),N0(),e.addEventListener("touchstart",t=>this.onTouch(t,"start"),{passive:!1}),e.addEventListener("touchmove",t=>this.onTouch(t,"move"),{passive:!1}),e.addEventListener("touchend",t=>this.onTouch(t,"end"),{passive:!1}),e.addEventListener("touchcancel",t=>this.onTouch(t,"end"),{passive:!1}),this.layout(),addEventListener("resize",()=>this.layout()),matchMedia("(pointer: coarse)").matches&&(this.state.touch=!0,this.ui.classList.add("on"))}layout(){const e=Nr(),t=Math.max(44,Math.round(Math.min(innerWidth,innerHeight)*.2)),s=innerHeight>innerWidth?Math.max(t*.35,innerHeight*.09):t*.35;Object.assign(this.jumpBtn.style,{width:t+"px",height:t+"px",right:e.right+t*.35+"px",bottom:e.bottom+s+"px"});const a=Math.round(t*1.4);Object.assign(this.base.style,{width:a+"px",height:a+"px"}),Object.assign(this.knob.style,{width:a*.45+"px",height:a*.45+"px"})}setVisible(e){this.ui.style.visibility=e?"":"hidden",e||(this.stick=null,this.touchJump=!1,this.base.classList.remove("show"),this.jumpBtn.classList.remove("down"))}highlightJump(e){this.jumpBtn.classList.toggle("tut-glow",e)}ghostStick(e){if(e&&!this.stick){const t=Nr(),i=parseFloat(this.base.style.width)||100;this.base.style.left=t.left+i*.9+"px",this.base.style.top=innerHeight-t.bottom-i*1.1-(innerHeight>innerWidth?innerHeight*.09:0)+"px"}this.base.classList.toggle("ghost",e&&!this.stick)}onTouch(e,t){const i=e.target;if(i!==this.el&&i.tagName!=="CANVAS"&&!this.ui.contains(i))return;e.preventDefault(),this.state.touch||(this.state.touch=!0,this.ui.classList.add("on"));const s=this.jumpBtn.getBoundingClientRect(),a=s.width*.33;for(const r of Array.from(e.changedTouches)){const o=r.clientX>=s.left-a&&r.clientX<=s.right+a&&r.clientY>=s.top-a&&r.clientY<=s.bottom+a;if(t==="start"){if(o){this.touchJump=!0,this.jumpBtn.classList.add("down");continue}r.clientX<innerWidth*.45&&!this.stick?(this.stick={id:r.identifier,ox:r.clientX,oy:r.clientY,x:r.clientX,y:r.clientY},this.base.style.left=r.clientX+"px",this.base.style.top=r.clientY+"px",this.base.classList.add("show"),this.base.classList.remove("ghost")):this.lookId===null&&(this.lookId=r.identifier,this.lookLast={x:r.clientX,y:r.clientY})}else t==="move"?(this.stick&&r.identifier===this.stick.id&&(this.stick.x=r.clientX,this.stick.y=r.clientY),r.identifier===this.lookId&&(this.state.look.x+=(r.clientX-this.lookLast.x)*1.4,this.state.look.y+=(r.clientY-this.lookLast.y)*1.4,this.lookLast={x:r.clientX,y:r.clientY})):(this.stick&&r.identifier===this.stick.id&&(this.stick=null,this.base.classList.remove("show")),r.identifier===this.lookId&&(this.lookId=null),(o||e.touches.length===0)&&(this.touchJump=!1,this.jumpBtn.classList.remove("down")))}}update(){const e=this.keys;let t=(e.has("KeyD")||e.has("ArrowRight")?1:0)-(e.has("KeyA")||e.has("ArrowLeft")?1:0),i=(e.has("KeyW")||e.has("ArrowUp")?1:0)-(e.has("KeyS")||e.has("ArrowDown")?1:0);if(this.stick){const a=parseFloat(this.base.style.width)/2;let r=(this.stick.x-this.stick.ox)/a,o=(this.stick.y-this.stick.oy)/a;const c=Math.hypot(r,o);c>1&&(r/=c,o/=c),this.knob.style.transform=`translate(${r*a*.6}px, ${o*a*.6}px)`,t=r,i=-o}const s=Math.hypot(t,i);s>1&&(t/=s,i/=s),this.state.move.x=t,this.state.move.y=i,this.state.jump=e.has("Space")||this.touchJump}consumeLook(){const e={x:this.state.look.x,y:this.state.look.y,zoom:this.state.zoom};return this.state.look.x=this.state.look.y=this.state.zoom=0,e}}function ts(n){const e=document.createElement("div");return e.className=n,e}let So=!1;function N0(){if(So)return;So=!0;const n=document.createElement("style");n.textContent=`
.touch-ui{position:absolute;inset:0;pointer-events:none;display:none;z-index:5}
.touch-ui.on{display:block}
.stick-base{position:absolute;transform:translate(-50%,-50%);border-radius:50%;background:rgba(20,30,60,.25);border:3px solid rgba(255,255,255,.75);display:none}
.stick-base.show{display:block}
.stick-base.ghost{display:block;opacity:.85;animation:stickGhost 1.6s ease-in-out infinite}
.stick-base.ghost .stick-knob{animation:knobGhost 1.6s ease-in-out infinite}
@keyframes stickGhost{50%{opacity:.5}}
@keyframes knobGhost{0%,100%{transform:translate(0,0)}25%{transform:translate(0,-30%)}75%{transform:translate(30%,0)}}
.stick-knob{position:absolute;left:50%;top:50%;margin:auto;inset:0;border-radius:50%;background:rgba(255,255,255,.85);box-shadow:0 3px 8px rgba(0,0,0,.25)}
.jump-btn{position:absolute;border-radius:50%;background:rgba(20,30,60,.38);border:3px solid rgba(255,255,255,.9);box-shadow:0 4px 10px rgba(0,0,0,.25)}
.jump-btn::after{content:'';position:absolute;left:50%;top:50%;width:34%;height:34%;transform:translate(-50%,-30%) rotate(45deg);border-left:6px solid #fff;border-top:6px solid #fff}
.jump-btn.down{background:rgba(255,255,255,.5);transform:scale(.94)}
`,document.head.appendChild(n)}class O0{constructor(){this.yaw=0,this.pitch=.35,this.dist=11,this.focus=new he,this.first=!0,this.shakeT=0,this.shakeA=0,this.yawGoal=null,this.camera=new vi(65,1,.1,500)}shake(e=.25){this.shakeA=e,this.shakeT=.35}turnTo(e){this.yawGoal=e}rotate(e,t,i){(e||t)&&(this.yawGoal=null),this.yaw-=e*.006,this.pitch=Wt.clamp(this.pitch+t*.005,-.25,1.3),this.dist=Wt.clamp(this.dist*(1+i*.1),5,24)}forward(e){return e.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw))}update(e,t){if(this.yawGoal!==null){let a=this.yawGoal-this.yaw;a=Math.atan2(Math.sin(a),Math.cos(a)),this.yaw+=a*(1-Math.exp(-e*3.5)),Math.abs(a)<.01&&(this.yawGoal=null)}const i=new he(t.x,t.y+2.2,t.z);this.first&&(this.focus.copy(i),this.first=!1),this.focus.x=i.x,this.focus.z=i.z,this.focus.y+=(i.y-this.focus.y)*(1-Math.exp(-e*8));const s=Math.cos(this.pitch);if(this.camera.position.set(this.focus.x+Math.sin(this.yaw)*s*this.dist,this.focus.y+Math.sin(this.pitch)*this.dist,this.focus.z+Math.cos(this.yaw)*s*this.dist),this.camera.lookAt(this.focus),this.shakeT>0){this.shakeT-=e;const a=this.shakeA*Math.max(0,this.shakeT/.35);this.camera.position.x+=(Math.random()-.5)*a,this.camera.position.y+=(Math.random()-.5)*a}}resize(e,t){this.camera.aspect=e/t,this.camera.fov=e<t?80:65,this.camera.updateProjectionMatrix()}}const Yn={speed:8,accel:60,airControl:.7,jumpV:13,gravity:34,turn:14},F0=.12,k0=.14;class ol{constructor(e,t){this.avatar=e,this.collide=t,this.pos=new he,this.vel=new he,this.grounded=!0,this.facing=0,this.jumpHeld=!1,this.sinceGround=0,this.sinceJumpPress=99,this.ground=null,this.touched=[],this.spawn=new he,this.grip=1,this.speedMul=1,this.spawnYaw=0}setAvatar(e){this.avatar=e,e.root.position.copy(this.pos),e.root.rotation.y=this.facing}respawn(){this.pos.copy(this.spawn),this.vel.set(0,0,0),this.facing=this.spawnYaw,this.sinceGround=99,this.ground=null,this.touched=[],this.grounded=!1}get yaw(){return this.facing}setSpawn(e,t=this.facing){this.spawn.copy(e),this.spawnYaw=t}update(e,t,i,s){const a=new he(-s.z,0,s.x),r=new he().addScaledVector(s,t.y).addScaledVector(a,t.x).multiplyScalar(Yn.speed*this.speedMul),o=Yn.accel*(this.grounded?this.grip:Yn.airControl)*e,c=r.x-this.vel.x,l=r.z-this.vel.z,d=Math.hypot(c,l);if(d>0){const g=Math.min(1,o/d);this.vel.x+=c*g,this.vel.z+=l*g}i&&!this.jumpHeld&&(this.sinceJumpPress=0),this.jumpHeld=i,this.sinceJumpPress+=e,this.sinceGround=this.grounded?0:this.sinceGround+e,this.sinceJumpPress<=k0&&this.sinceGround<=F0&&this.vel.y<=.01&&(this.vel.y=Yn.jumpV,this.grounded=!1,this.onJump?.(),this.sinceGround=99,this.sinceJumpPress=99),this.vel.y=Math.max(this.vel.y-Yn.gravity*e,-45);const h=this.grounded,u=this.vel.y,v=this.collide(this.pos,this.vel,e);this.grounded=v.grounded,!h&&v.grounded&&u<-4&&this.onLand?.(-u),this.ground=v.ground,this.touched=v.touched;const b=Math.hypot(this.vel.x,this.vel.z);if(b>.5){let f=Math.atan2(this.vel.x,this.vel.z)-this.facing;f=Math.atan2(Math.sin(f),Math.cos(f)),this.facing+=f*(1-Math.exp(-e*Yn.turn))}const S=this.avatar;S.root.position.copy(this.pos),S.root.rotation.y=this.facing,S.setState(this.grounded?b>.5?"run":"idle":this.vel.y>0?"jump":"fall"),S.update(e,Math.min(1,b/Yn.speed))}}const An={halfW:.42,height:2.6},B0=.35,G0=1/120;class H0{constructor(){this.solids=[],this.lastGround=new WeakMap,this.cur=[],this.near=new ti,this.body=new ti}add(e){return this.solids.push(e),e}remove(e){const t=this.solids.indexOf(e);t>=0&&this.solids.splice(t,1)}addMesh(e,t){return e.updateMatrixWorld(!0),this.add({box:new ti().setFromObject(e),kind:t})}move(e,t,i,s){const a=Math.hypot(t.x,t.y,t.z)*i+4;this.near.min.set(e.x-a,e.y-a,e.z-a),this.near.max.set(e.x+a,e.y+An.height+a,e.z+a),this.cur=[];for(const d of this.solids)d.box.intersectsBox(this.near)&&this.cur.push(d);if(s)for(const d of s)d.box.intersectsBox(this.near)&&this.cur.push(d);const r={grounded:!1,ground:null,touched:[]},o=this.lastGround.get(e);o?.delta&&this.cur.includes(o)&&e.add(o.delta);const c=Math.max(1,Math.ceil(i/G0)),l=i/c;for(let d=0;d<c;d++)this.step(e,t,l,r);return this.lastGround.set(e,r.ground),r}bodyAt(e){return this.body.set(new he(e.x-An.halfW,e.y,e.z-An.halfW),new he(e.x+An.halfW,e.y+An.height,e.z+An.halfW))}step(e,t,i,s){for(const a of["x","z"]){e[a]+=t[a]*i;for(const r of this.cur){const o=this.bodyAt(e);if(!ns(o,r.box))continue;const c=r.box.max.y-e.y;if(c>0&&c<=B0&&t.y<=0&&this.free(e,c+.001)){e.y+=c+.001;continue}e[a]=t[a]>0?r.box.min[a]-An.halfW-1e-4:t[a]<0?r.box.max[a]+An.halfW+1e-4:e[a],t[a]=0,s.touched.push(r)}}e.y+=t.y*i;for(const a of this.cur){const r=this.bodyAt(e);ns(r,a.box)&&(t.y<=0?(e.y=a.box.max.y,s.grounded=!0,s.ground=a):e.y=a.box.min.y-An.height-1e-4,t.y=0,s.touched.push(a))}if(!s.grounded&&t.y<=0){const a=this.bodyAt(e).clone();a.min.y-=.02,a.max.y=e.y+.01;for(const r of this.cur)if(a.intersectsBox(r.box)&&r.box.max.y<=e.y+.01){s.grounded=!0,s.ground=r;break}}}free(e,t){const i=this.bodyAt(e.clone().setY(e.y+t));return!this.cur.some(s=>ns(i,s.box))}}function ns(n,e){return is(n,e,"x")>1e-6&&is(n,e,"y")>1e-6&&is(n,e,"z")>1e-6}function is(n,e,t){return Math.min(n.max[t],e.max[t])-Math.max(n.min[t],e.min[t])}class z0{constructor(e,t){if(this.extra=t,this.box=null,this.frames=0,this.acc=0,this.worst=0,this.hitches=0,this.worstAge=0,location.search.includes("nofps=1")||!Gd("fps")&&!(location.hostname.endsWith("github.io")&&location.search.includes("fps=1")))return;const i=document.createElement("div");i.style.cssText="position:absolute;left:calc(env(safe-area-inset-left) + 14px);top:calc(env(safe-area-inset-top) + 15.5vh);z-index:8;padding:3px 8px;border-radius:8px;background:rgba(0,0,0,.55);color:#fff;font:700 12px/1.35 monospace;pointer-events:none;white-space:pre",e.appendChild(i),this.box=i}frame(e){if(this.box&&(this.frames++,this.acc+=e,this.worst=Math.max(this.worst,e),e>.05&&this.hitches++,this.acc>=.5)){const t=this.frames/this.acc,i=t>=50?"#7cf08f":t>=30?"#ffe14d":"#ff6b6b";this.box.innerHTML=`<span style="color:${i}">FPS ${t.toFixed(0)}</span>  кадр макс ${(this.worst*1e3).toFixed(0)} мс
рывков ${this.hitches}  DPR ${Hd()}${this.extra?"  "+this.extra():""}`,this.frames=0,this.acc=0,this.worstAge+=.5,this.worstAge>=2&&(this.worst=0,this.worstAge=0)}}}const V0=["jump","land","click","denied","place","remove","bounce","lava","checkpoint","coin","finish","respawn","spin","reelstop","boom","whoosh","thud","bubble","fire","freeze","zap","splash","cluck","meow","boing","hurt","cheer","fail","tada","buzz","croak","rumble"],W0={land:.45,jump:.55,click:.6,finish:.8,coin:.5,boom:.6,cluck:.5,meow:.5,fail:.6,zap:.5,cheer:.65,whoosh:.6,spin:.6,tada:.75,hurt:.8,thud:.8},X0=(()=>{try{return!!document.createElement("audio").canPlayType("audio/ogg; codecs=opus")}catch{return!1}})(),_n=class _n{constructor(){this.ctx=null,this.master=null,this.buffers=new Map,this.last=new Map,this.musicGain=null,this.sfxGain=null,this.sfxVol=1,this.musicVol=1,this.duck=1,this.lastTrack=-1,this.musicOn=!1,this.cur=null}async load(){try{this.ctx=new AudioContext,this.master=this.ctx.createGain(),this.master.connect(this.ctx.destination),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=this.sfxVol,this.sfxGain.connect(this.master)}catch{return}gt.audio.setHandlers({onSuspend:()=>{this.master&&(this.master.gain.value=0),this.ctx?.suspend()},onResume:()=>{this.master&&(this.master.gain.value=1),this.ctx?.resume()}});const e=()=>{this.ctx?.resume()};addEventListener("pointerdown",e,{once:!1,passive:!0}),addEventListener("keydown",e,{passive:!0}),await Promise.all(V0.map(async t=>{try{const i=await fetch(`./assets/sfx/${t}.mp3`),s=await this.ctx.decodeAudioData(await i.arrayBuffer());this.buffers.set(t,s)}catch{}}))}play(e,t=.06,i=1,s=1){const a=this.ctx,r=this.buffers.get(e);if(!a||!r||!this.master||a.state!=="running")return;const o=a.currentTime;if(o-(this.last.get(e)??-1)<.06)return;this.last.set(e,o);const c=a.createBufferSource();c.buffer=r,c.playbackRate.value=s*(1+(Math.random()*2-1)*t);const l=a.createGain();l.gain.value=(W0[e]??1)*i,c.connect(l).connect(this.sfxGain??this.master),c.start()}setMuted(e){gt.audio.setMuted(e)}setSfxVolume(e){this.sfxVol=e,this.sfxGain&&(this.sfxGain.gain.value=e)}setMusicVolume(e){this.musicVol=e,this.applyMusic()}setDuck(e){this.duck=e?.35:1,this.applyMusic()}applyMusic(){this.musicGain&&this.ctx&&this.musicGain.gain.setTargetAtTime(this.musicVol*this.duck*_n.MUSIC_BASE,this.ctx.currentTime,.08)}startMusic(){!this.ctx||!this.master||this.musicOn||(this.musicOn=!0,this.musicGain=this.ctx.createGain(),this.musicGain.connect(this.master),this.applyMusic(),this.nextTrack())}async nextTrack(){const e=this.ctx;let t=Math.floor(Math.random()*_n.TRACKS);t===this.lastTrack&&(t=(t+1+Math.floor(Math.random()*(_n.TRACKS-1)))%_n.TRACKS),this.lastTrack=t;let i=null;try{const l=await fetch(`./assets/music/music${t+1}.${X0?"ogg":"mp3"}?v=mwpzjthk`);if(!l.ok)throw new Error("нет трека");i=await e.decodeAudioData(await l.arrayBuffer())}catch{setTimeout(()=>void this.nextTrack(),2e4);return}const s=this.cur;s&&(s.g.gain.setTargetAtTime(0,e.currentTime,.4),s.src.stop(e.currentTime+2.5));const a=e.createGain();a.gain.value=0,a.gain.setTargetAtTime(1,e.currentTime,s?.4:.15),a.connect(this.musicGain);const r=e.createBufferSource();r.buffer=i,r.loop=!0,r.connect(a),r.start(),this.cur={src:r,g:a};const o=e.currentTime+i.duration*_n.LOOPS-1.5,c=()=>{e.currentTime>=o?this.nextTrack():setTimeout(c,500)};setTimeout(c,500)}};_n.MUSIC_BASE=.375,_n.TRACKS=5,_n.LOOPS=2;let Cs=_n;const Ve=new Cs,Ls=[{id:"noob",name:"Нуб",price:0,look:al},{id:"red",name:"Ёжик",price:30,look:{skin:15845280,shirt:15220794,pants:1908002,shoes:16777215,sleeve:.3,hair:"spiky",hairColor:1446416,face:"happy"}},{id:"cap",name:"Кепка",price:50,look:{skin:9263675,shirt:16237596,pants:2782440,shoes:2236962,sleeve:.35,hair:"cap",hat:3125322,face:"cool"}},{id:"girl",name:"Настя",price:60,look:{skin:15845280,shirt:16740277,pants:10181072,shoes:16777215,sleeve:1,hair:"long",hairColor:15254106,face:"smile"}},{id:"winter",name:"Зима",price:80,look:{skin:16767925,shirt:2782440,pants:1908002,shoes:16777215,sleeve:1,hair:"beanie",hat:15220794,face:"grin"}},{id:"ginger",name:"Рыжик",price:100,look:{skin:15845280,shirt:1447446,pants:2829107,shoes:15658734,sleeve:.4,hair:"short",hairColor:12867100,face:"grin"}},{id:"lime",name:"Лайм",price:140,look:{skin:10215773,shirt:1483683,pants:1007455,shoes:16237596,sleeve:0,hair:"none",face:"happy"}},{id:"ninja",name:"Ниндзя",price:200,look:{skin:5922667,shirt:1447446,pants:1447446,shoes:15220794,sleeve:1,hair:"beanie",hat:1447446,face:"cool"}},{id:"gold",name:"Золотой",price:400,look:{skin:16765498,shirt:16758784,pants:16765498,shoes:16758784,sleeve:0,hair:"none",face:"cool"}}];function K0(n){const e=new Map,t=new Map,i=n.clone();return cl(n,i,function(s,a){e.set(a,s),t.set(s,a)}),i.traverse(function(s){if(!s.isSkinnedMesh)return;const a=s,r=e.get(s),o=r.skeleton.bones;a.skeleton=r.skeleton.clone(),a.bindMatrix.copy(r.bindMatrix),a.skeleton.bones=o.map(function(c){return t.get(c)}),a.bind(a.skeleton,a.bindMatrix)}),i}function cl(n,e,t){t(n,e);for(let i=0;i<n.children.length;i++)cl(n.children[i],e.children[i],t)}class j0 extends zd{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new J0(t)}),this.register(function(t){return new Q0(t)}),this.register(function(t){return new cg(t)}),this.register(function(t){return new lg(t)}),this.register(function(t){return new dg(t)}),this.register(function(t){return new tg(t)}),this.register(function(t){return new ng(t)}),this.register(function(t){return new ig(t)}),this.register(function(t){return new ag(t)}),this.register(function(t){return new Z0(t)}),this.register(function(t){return new sg(t)}),this.register(function(t){return new eg(t)}),this.register(function(t){return new og(t)}),this.register(function(t){return new rg(t)}),this.register(function(t){return new $0(t)}),this.register(function(t){return new Eo(t,$e.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Eo(t,$e.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new fg(t)})}load(e,t,i,s){const a=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const l=Yi.extractUrlBase(e);r=Yi.resolveURL(l,this.path)}else r=Yi.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){s?s(l):console.error(l),a.manager.itemError(e),a.manager.itemEnd(e)},c=new zc(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{a.parse(l,r,function(d){t(d),a.manager.itemEnd(e)},o)}catch(d){o(d)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let a;const r={},o={},c=new TextDecoder;if(typeof e=="string")a=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===ll){try{r[$e.KHR_BINARY_GLTF]=new ug(e)}catch(h){s&&s(h);return}a=JSON.parse(r[$e.KHR_BINARY_GLTF].content)}else a=JSON.parse(c.decode(e));else a=e;if(a.asset===void 0||a.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new wg(a,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const h=this.pluginCallbacks[d](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,r[h.name]=!0}if(a.extensionsUsed)for(let d=0;d<a.extensionsUsed.length;++d){const h=a.extensionsUsed[d],u=a.extensionsRequired||[];switch(h){case $e.KHR_MATERIALS_UNLIT:r[h]=new q0;break;case $e.KHR_DRACO_MESH_COMPRESSION:r[h]=new hg(a,this.dracoLoader);break;case $e.KHR_TEXTURE_TRANSFORM:r[h]=new pg;break;case $e.KHR_MESH_QUANTIZATION:r[h]=new mg;break;default:u.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(r),l.setPlugins(o),l.parse(i,s)}parseAsync(e,t){const i=this;return new Promise(function(s,a){i.parse(e,t,s,a)})}}function Y0(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}function Pt(n,e,t){const i=n.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}const $e={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class $0{constructor(e){this.parser=e,this.name=$e.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i];a.extensions&&a.extensions[this.name]&&a.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,a.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let s=t.cache.get(i);if(s)return s;const a=t.json,c=((a.extensions&&a.extensions[this.name]||{}).lights||[])[e];let l;const d=new Be(16777215);c.color!==void 0&&d.setRGB(c.color[0],c.color[1],c.color[2],hn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Hc(d),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Bc(d),l.distance=h;break;case"spot":l=new Vd(d),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),vn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,a=i.json.nodes[e],o=(a.extensions&&a.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return i._getNodeRef(t.cache,o,c)})}}class q0{constructor(){this.name=$e.KHR_MATERIALS_UNLIT}getMaterialType(){return Xt}extendParams(e,t,i){const s=[];e.color=new Be(1,1,1),e.opacity=1;const a=t.pbrMetallicRoughness;if(a){if(Array.isArray(a.baseColorFactor)){const r=a.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],hn),e.opacity=r[3]}a.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",a.baseColorTexture,Ht))}return Promise.all(s)}}class Z0{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class J0{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const a=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ut(a,a)}return Promise.all(s)}}class Q0{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class eg{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(s)}}class tg{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SHEEN}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];if(t.sheenColor=new Be(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){const a=i.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],hn)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,Ht)),i.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(s)}}class ng{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(s)}}class ig{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_VOLUME}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const a=i.attenuationColor||[1,1,1];return t.attenuationColor=new Be().setRGB(a[0],a[1],a[2],hn),Promise.all(s)}}class ag{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IOR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class sg{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));const a=i.specularColorFactor||[1,1,1];return t.specularColor=new Be().setRGB(a[0],a[1],a[2],hn),i.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,Ht)),Promise.all(s)}}class rg{constructor(e){this.parser=e,this.name=$e.EXT_MATERIALS_BUMP}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(s)}}class og{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?yn:null}extendMaterialParams(e,t){const i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(s)}}class cg{constructor(e){this.parser=e,this.name=$e.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const a=s.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,a.source,r)}}class lg{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,i=this.parser,s=i.json,a=s.textures[e];if(!a.extensions||!a.extensions[t])return null;const r=a.extensions[t],o=s.images[r.source];let c=i.textureLoader;if(o.uri){const l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,r.source,c)}}class dg{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,i=this.parser,s=i.json,a=s.textures[e];if(!a.extensions||!a.extensions[t])return null;const r=a.extensions[t],o=s.images[r.source];let c=i.textureLoader;if(o.uri){const l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,r.source,c)}}class Eo{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],a=this.parser.getDependency("buffer",s.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return a.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,d=s.count,h=s.byteStride,u=new Uint8Array(o,c,l);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(d,h,u,s.mode,s.filter).then(function(v){return v.buffer}):r.ready.then(function(){const v=new ArrayBuffer(d*h);return r.decodeGltfBuffer(new Uint8Array(v),d,h,u,s.mode,s.filter),v})})}else return null}}class fg{constructor(e){this.name=$e.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=t.meshes[i.mesh];for(const l of s.primitives)if(l.mode!==cn.TRIANGLES&&l.mode!==cn.TRIANGLE_STRIP&&l.mode!==cn.TRIANGLE_FAN&&l.mode!==void 0)return null;const r=i.extensions[this.name].attributes,o=[],c={};for(const l in r)o.push(this.parser.getDependency("accessor",r[l]).then(d=>(c[l]=d,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const d=l.pop(),h=d.isGroup?d.children:[d],u=l[0].count,v=[];for(const b of h){const S=new Qt,g=new he,f=new Ua,E=new he(1,1,1),y=new an(b.geometry,b.material,u);for(let _=0;_<u;_++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,_),c.SCALE&&E.fromBufferAttribute(c.SCALE,_),y.setMatrixAt(_,S.compose(g,f,E));for(const _ in c)if(_==="_COLOR_0"){const R=c[_];y.instanceColor=new Vc(R.array,R.itemSize,R.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&b.geometry.setAttribute(_,c[_]);ea.prototype.copy.call(y,b),this.parser.assignFinalMaterial(y),v.push(y)}return d.isGroup?(d.clear(),d.add(...v),d):v[0]}))}}const ll="glTF",Bi=12,To={JSON:1313821514,BIN:5130562};class ug{constructor(e){this.name=$e.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Bi),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ll)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Bi,a=new DataView(e,Bi);let r=0;for(;r<s;){const o=a.getUint32(r,!0);r+=4;const c=a.getUint32(r,!0);if(r+=4,c===To.JSON){const l=new Uint8Array(e,Bi+r,o);this.content=i.decode(l)}else if(c===To.BIN){const l=Bi+r;this.body=e.slice(l,l+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class hg{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$e.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,s=this.dracoLoader,a=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},c={},l={};for(const d in r){const h=Ps[d]||d.toLowerCase();o[h]=r[d]}for(const d in e.attributes){const h=Ps[d]||d.toLowerCase();if(r[d]!==void 0){const u=i.accessors[e.attributes[d]],v=xi[u.componentType];l[h]=v.name,c[h]=u.normalized===!0}}return t.getDependency("bufferView",a).then(function(d){return new Promise(function(h,u){s.decodeDracoFile(d,function(v){for(const b in v.attributes){const S=v.attributes[b],g=c[b];g!==void 0&&(S.normalized=g)}h(v)},o,l,hn,u)})})}}class pg{constructor(){this.name=$e.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class mg{constructor(){this.name=$e.KHR_MESH_QUANTIZATION}}class dl extends af{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=e*s*3+s;for(let r=0;r!==s;r++)t[r]=i[a+r];return t}interpolate_(e,t,i,s){const a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,d=s-t,h=(i-t)/d,u=h*h,v=u*h,b=e*l,S=b-l,g=-2*v+3*u,f=v-u,E=1-g,y=f-u+h;for(let _=0;_!==o;_++){const R=r[S+_+o],T=r[S+_+c]*d,I=r[b+_+o],x=r[b+_]*d;a[_]=E*R+y*T+g*I+f*x}return a}}const gg=new Ua;class vg extends dl{interpolate_(e,t,i,s){const a=super.interpolate_(e,t,i,s);return gg.fromArray(a).normalize().toArray(a),a}}const cn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},xi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wo={9728:Pn,9729:Kt,9984:xc,9985:ba,9986:zi,9987:Gn},yo={33071:ya,33648:_c,10497:ii},as={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ps={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Fn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},_g={CUBICSPLINE:void 0,LINEAR:Wc,STEP:tf},ss={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function xg(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new en({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Mi})),n.DefaultMaterial}function $n(n,e,t){for(const i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function vn(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function bg(n,e,t){let i=!1,s=!1,a=!1;for(let l=0,d=e.length;l<d;l++){const h=e[l];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(a=!0),i&&s&&a)break}if(!i&&!s&&!a)return Promise.resolve(n);const r=[],o=[],c=[];for(let l=0,d=e.length;l<d;l++){const h=e[l];if(i){const u=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):n.attributes.position;r.push(u)}if(s){const u=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):n.attributes.normal;o.push(u)}if(a){const u=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):n.attributes.color;c.push(u)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(c)]).then(function(l){const d=l[0],h=l[1],u=l[2];return i&&(n.morphAttributes.position=d),s&&(n.morphAttributes.normal=h),a&&(n.morphAttributes.color=u),n.morphTargetsRelative=!0,n})}function Mg(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Sg(n){let e;const t=n.extensions&&n.extensions[$e.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+rs(t.attributes):e=n.indices+":"+rs(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+rs(n.targets[i]);return e}function rs(n){let e="";const t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function Is(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Eg(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Tg=new Qt;class wg{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Y0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,a=!1,r=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=i&&c?parseInt(c[1],10):-1,a=o.indexOf("Firefox")>-1,r=a?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||a&&r<98?this.textureLoader=new Wd(this.options.manager):this.textureLoader=new Xd(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new zc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,s=this.json,a=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(r){const o={scene:r[0][s.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:s.asset,parser:i,userData:{}};return $n(a,o,s),vn(o,s),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,a=t.length;s<a;s++){const r=t[s].joints;for(let o=0,c=r.length;o<c;o++)e[r[o]].isBone=!0}for(let s=0,a=e.length;s<a;s++){const r=e[s];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(i[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const s=i.clone(),a=(r,o)=>{const c=this.associations.get(r);c!=null&&this.associations.set(o,c);for(const[l,d]of r.children.entries())a(d,o.children[l])};return a(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const s=e(t[i]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let s=0;s<t.length;s++){const a=e(t[s]);a&&i.push(a)}return i}getDependency(e,t){const i=e+":"+t;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(a){return a.loadNode&&a.loadNode(t)});break;case"mesh":s=this._invokeOne(function(a){return a.loadMesh&&a.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(a){return a.loadBufferView&&a.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(a){return a.loadMaterial&&a.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(a){return a.loadTexture&&a.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(a){return a.loadAnimation&&a.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(a){return a!=this&&a.getDependency&&a.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(a,r){return i.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$e.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(a,r){i.load(Yi.resolveURL(t.uri,s.path),a,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const s=t.byteLength||0,a=t.byteOffset||0;return i.slice(a,a+s)})}loadAccessor(e){const t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const r=as[s.type],o=xi[s.componentType],c=s.normalized===!0,l=new o(s.count*r);return Promise.resolve(new Gt(l,r,c))}const a=[];return s.bufferView!==void 0?a.push(this.getDependency("bufferView",s.bufferView)):a.push(null),s.sparse!==void 0&&(a.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),a.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(a).then(function(r){const o=r[0],c=as[s.type],l=xi[s.componentType],d=l.BYTES_PER_ELEMENT,h=d*c,u=s.byteOffset||0,v=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,b=s.normalized===!0;let S,g;if(v&&v!==h){const f=Math.floor(u/v),E="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count;let y=t.cache.get(E);y||(S=new l(o,f*v,s.count*v/d),y=new Kd(S,v/d),t.cache.add(E,y)),g=new nf(y,c,u%v/d,b)}else o===null?S=new l(s.count*c):S=new l(o,u,s.count*c),g=new Gt(S,c,b);if(s.sparse!==void 0){const f=as.SCALAR,E=xi[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,R=new E(r[1],y,s.sparse.count*f),T=new l(r[2],_,s.sparse.count*c);o!==null&&(g=new Gt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let I=0,x=R.length;I<x;I++){const w=R[I];if(g.setX(w,T[I*c]),c>=2&&g.setY(w,T[I*c+1]),c>=3&&g.setZ(w,T[I*c+2]),c>=4&&g.setW(w,T[I*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=b}return g})}loadTexture(e){const t=this.json,i=this.options,a=t.textures[e].source,r=t.images[a];let o=this.textureLoader;if(r.uri){const c=i.manager.getHandler(r.uri);c!==null&&(o=c)}return this.loadTextureImage(e,a,o)}loadTextureImage(e,t,i){const s=this,a=this.json,r=a.textures[e],o=a.images[t],c=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,i).then(function(d){d.flipY=!1,d.name=r.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);const u=(a.samplers||{})[r.sampler]||{};return d.magFilter=wo[u.magFilter]||Kt,d.minFilter=wo[u.minFilter]||Gn,d.wrapS=yo[u.wrapS]||ii,d.wrapT=yo[u.wrapT]||ii,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==Pn&&d.minFilter!==Kt,s.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const i=this,s=this.json,a=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const r=s.images[e],o=self.URL||self.webkitURL;let c=r.uri||"",l=!1;if(r.bufferView!==void 0)c=i.getDependency("bufferView",r.bufferView).then(function(h){l=!0;const u=new Blob([h],{type:r.mimeType});return c=o.createObjectURL(u),c});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(c).then(function(h){return new Promise(function(u,v){let b=u;t.isImageBitmapLoader===!0&&(b=function(S){const g=new Ra(S);g.needsUpdate=!0,u(g)}),t.load(Yi.resolveURL(h,a.path),b,void 0,v)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),vn(h,r),h.userData.mimeType=r.mimeType||Eg(r.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=d,d}assignTexture(e,t,i,s){const a=this;return this.getDependency("texture",i.index).then(function(r){if(!r)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(r=r.clone(),r.channel=i.texCoord),a.extensions[$e.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[$e.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=a.associations.get(r);r=a.extensions[$e.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),a.associations.set(r,c)}}return s!==void 0&&(r.colorSpace=s),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const s=t.attributes.tangent===void 0,a=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let c=this.cache.get(o);c||(c=new jd,ja.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(o,c)),i=c}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let c=this.cache.get(o);c||(c=new Yd,ja.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(o,c)),i=c}if(s||a||r){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),a&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=i.clone(),a&&(c.vertexColors=!0),r&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(i))),i=c}e.material=i}getMaterialType(){return en}loadMaterial(e){const t=this,i=this.json,s=this.extensions,a=i.materials[e];let r;const o={},c=a.extensions||{},l=[];if(c[$e.KHR_MATERIALS_UNLIT]){const h=s[$e.KHR_MATERIALS_UNLIT];r=h.getMaterialType(),l.push(h.extendParams(o,a,t))}else{const h=a.pbrMetallicRoughness||{};if(o.color=new Be(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const u=h.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],hn),o.opacity=u[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,Ht)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),r=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}a.doubleSided===!0&&(o.side=ln);const d=a.alphaMode||ss.OPAQUE;if(d===ss.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===ss.MASK&&(o.alphaTest=a.alphaCutoff!==void 0?a.alphaCutoff:.5)),a.normalTexture!==void 0&&r!==Xt&&(l.push(t.assignTexture(o,"normalMap",a.normalTexture)),o.normalScale=new Ut(1,1),a.normalTexture.scale!==void 0)){const h=a.normalTexture.scale;o.normalScale.set(h,h)}if(a.occlusionTexture!==void 0&&r!==Xt&&(l.push(t.assignTexture(o,"aoMap",a.occlusionTexture)),a.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=a.occlusionTexture.strength)),a.emissiveFactor!==void 0&&r!==Xt){const h=a.emissiveFactor;o.emissive=new Be().setRGB(h[0],h[1],h[2],hn)}return a.emissiveTexture!==void 0&&r!==Xt&&l.push(t.assignTexture(o,"emissiveMap",a.emissiveTexture,Ht)),Promise.all(l).then(function(){const h=new r(o);return a.name&&(h.name=a.name),vn(h,a),t.associations.set(h,{materials:e}),a.extensions&&$n(s,h,a),h})}createUniqueName(e){const t=$d.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,s=this.primitiveCache;function a(o){return i[$e.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Ao(c,o,t)})}const r=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],d=Sg(l),h=s[d];if(h)r.push(h.promise);else{let u;l.extensions&&l.extensions[$e.KHR_DRACO_MESH_COMPRESSION]?u=a(l):u=Ao(new Ri,l,t),s[d]={primitive:l,promise:u},r.push(u)}}return Promise.all(r)}loadMesh(e){const t=this,i=this.json,s=this.extensions,a=i.meshes[e],r=a.primitives,o=[];for(let c=0,l=r.length;c<l;c++){const d=r[c].material===void 0?xg(this.cache):this.getDependency("material",r[c].material);o.push(d)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),d=c[c.length-1],h=[];for(let v=0,b=d.length;v<b;v++){const S=d[v],g=r[v];let f;const E=l[v];if(g.mode===cn.TRIANGLES||g.mode===cn.TRIANGLE_STRIP||g.mode===cn.TRIANGLE_FAN||g.mode===void 0)f=a.isSkinnedMesh===!0?new Es(S,E):new ot(S,E),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),g.mode===cn.TRIANGLE_STRIP?f.geometry=fo(f.geometry,Gc):g.mode===cn.TRIANGLE_FAN&&(f.geometry=fo(f.geometry,Ss));else if(g.mode===cn.LINES)f=new qd(S,E);else if(g.mode===cn.LINE_STRIP)f=new Zd(S,E);else if(g.mode===cn.LINE_LOOP)f=new Jd(S,E);else if(g.mode===cn.POINTS)f=new Qd(S,E);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(f.geometry.morphAttributes).length>0&&Mg(f,a),f.name=t.createUniqueName(a.name||"mesh_"+e),vn(f,a),g.extensions&&$n(s,f,g),t.assignFinalMaterial(f),h.push(f)}for(let v=0,b=h.length;v<b;v++)t.associations.set(h[v],{meshes:e,primitives:v});if(h.length===1)return a.extensions&&$n(s,h[0],a),h[0];const u=new un;a.extensions&&$n(s,u,a),t.associations.set(u,{meshes:e});for(let v=0,b=h.length;v<b;v++)u.add(h[v]);return u})}loadCamera(e){let t;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new vi(Wt.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new ks(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),vn(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let s=0,a=t.joints.length;s<a;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const a=s.pop(),r=s,o=[],c=[];for(let l=0,d=r.length;l<d;l++){const h=r[l];if(h){o.push(h);const u=new Qt;a!==null&&u.fromArray(a.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Ts(o,c)})}loadAnimation(e){const t=this.json,i=this,s=t.animations[e],a=s.name?s.name:"animation_"+e,r=[],o=[],c=[],l=[],d=[];for(let h=0,u=s.channels.length;h<u;h++){const v=s.channels[h],b=s.samplers[v.sampler],S=v.target,g=S.node,f=s.parameters!==void 0?s.parameters[b.input]:b.input,E=s.parameters!==void 0?s.parameters[b.output]:b.output;S.node!==void 0&&(r.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",E)),l.push(b),d.push(S))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(d)]).then(function(h){const u=h[0],v=h[1],b=h[2],S=h[3],g=h[4],f=[];for(let y=0,_=u.length;y<_;y++){const R=u[y],T=v[y],I=b[y],x=S[y],w=g[y];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();const N=i._createAnimationTracks(R,T,I,x,w);if(N)for(let O=0;O<N.length;O++)f.push(N[O])}const E=new ef(a,void 0,f);return vn(E,s),E})}createNodeMesh(e){const t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(a){const r=i._getNodeRef(i.meshCache,s.mesh,a);return s.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),r})}loadNode(e){const t=this.json,i=this,s=t.nodes[e],a=i._loadNodeShallow(e),r=[],o=s.children||[];for(let l=0,d=o.length;l<d;l++)r.push(i.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([a,Promise.all(r),c]).then(function(l){const d=l[0],h=l[1],u=l[2];u!==null&&d.traverse(function(v){v.isSkinnedMesh&&v.bind(u,Tg)});for(let v=0,b=h.length;v<b;v++)d.add(h[v]);if(d.userData.pivot!==void 0&&h.length>0){const v=d.userData.pivot,b=h[0];d.pivot=new he().fromArray(v),d.position.x-=v[0],d.position.y-=v[1],d.position.z-=v[2],b.position.set(0,0,0),delete d.userData.pivot}return d})}_loadNodeShallow(e){const t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const a=t.nodes[e],r=a.name?s.createUniqueName(a.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),a.camera!==void 0&&o.push(s.getDependency("camera",a.camera).then(function(l){return s._getNodeRef(s.cameraCache,a.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let d;if(a.isBone===!0?d=new kn:l.length>1?d=new un:l.length===1?d=l[0]:d=new ea,d!==l[0])for(let h=0,u=l.length;h<u;h++)d.add(l[h]);if(a.name&&(d.userData.name=a.name,d.name=r),vn(d,a),a.extensions&&$n(i,d,a),a.matrix!==void 0){const h=new Qt;h.fromArray(a.matrix),d.applyMatrix4(h)}else a.translation!==void 0&&d.position.fromArray(a.translation),a.rotation!==void 0&&d.quaternion.fromArray(a.rotation),a.scale!==void 0&&d.scale.fromArray(a.scale);if(!s.associations.has(d))s.associations.set(d,{});else if(a.mesh!==void 0&&s.meshCache.refs[a.mesh]>1){const h=s.associations.get(d);s.associations.set(d,{...h})}return s.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],s=this,a=new un;i.name&&(a.name=s.createUniqueName(i.name)),vn(a,i),i.extensions&&$n(t,a,i);const r=i.nodes||[],o=[];for(let c=0,l=r.length;c<l;c++)o.push(s.getDependency("node",r[c]));return Promise.all(o).then(function(c){for(let d=0,h=c.length;d<h;d++){const u=c[d];u.parent!==null?a.add(K0(u)):a.add(u)}const l=d=>{const h=new Map;for(const[u,v]of s.associations)(u instanceof ja||u instanceof Ra)&&h.set(u,v);return d.traverse(u=>{const v=s.associations.get(u);v!=null&&h.set(u,v)}),h};return s.associations=l(a),a})}_createAnimationTracks(e,t,i,s,a){const r=[],o=e.name?e.name:e.uuid,c=[];function l(v){v.morphTargetInfluences&&c.push(v.name?v.name:v.uuid)}Fn[a.path]===Fn.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let d;switch(Fn[a.path]){case Fn.weights:d=Dr;break;case Fn.rotation:d=Ur;break;case Fn.translation:case Fn.scale:d=Ir;break;default:switch(i.itemSize){case 1:d=Dr;break;case 2:case 3:default:d=Ir;break}break}const h=s.interpolation!==void 0?_g[s.interpolation]:Wc,u=this._getArrayFromAccessor(i);for(let v=0,b=c.length;v<b;v++){const S=new d(c[v]+"."+Fn[a.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(S),r.push(S)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=Is(t.constructor),s=new Float32Array(t.length);for(let a=0,r=t.length;a<r;a++)s[a]=t[a]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const s=this instanceof Ur?vg:dl;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function yg(n,e,t){const i=e.attributes,s=new ti;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new he(c[0],c[1],c[2]),new he(l[0],l[1],l[2])),o.normalized){const d=Is(xi[o.componentType]);s.min.multiplyScalar(d),s.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const a=e.targets;if(a!==void 0){const o=new he,c=new he;for(let l=0,d=a.length;l<d;l++){const h=a[l];if(h.POSITION!==void 0){const u=t.json.accessors[h.POSITION],v=u.min,b=u.max;if(v!==void 0&&b!==void 0){if(c.setX(Math.max(Math.abs(v[0]),Math.abs(b[0]))),c.setY(Math.max(Math.abs(v[1]),Math.abs(b[1]))),c.setZ(Math.max(Math.abs(v[2]),Math.abs(b[2]))),u.normalized){const S=Is(xi[u.componentType]);c.multiplyScalar(S)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;const r=new sf;s.getCenter(r.center),r.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=r}function Ao(n,e,t){const i=e.attributes,s=[];function a(r,o){return t.getDependency("accessor",r).then(function(c){n.setAttribute(o,c)})}for(const r in i){const o=Ps[r]||r.toLowerCase();o in n.attributes||s.push(a(i[r],o))}if(e.indices!==void 0&&!n.index){const r=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(r)}return Mt.workingColorSpace!==hn&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Mt.workingColorSpace}" not supported.`),vn(n,e),yg(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?bg(n,e.targets,t):n})}const os=["body","torso","legL","legR","armL","armR","head"],cs=new Map,Ag=new j0;function Rg(n){return new Promise(e=>{const t=new Image;t.onload=()=>e(t),t.onerror=()=>e(null),t.src=n})}function Cg(n){let e=cs.get(n);return e||(e=Lg(n),cs.set(n,e),e.catch(()=>cs.delete(n))),e}async function Lg(n){const[e,t]=await Promise.all([Ag.loadAsync(`./assets/chars/${n}.glb?v=mwpzjthk`),Rg(`./assets/chars/faces/${n}.webp?v=mwpzjthk`)]),i=e.scene;i.updateMatrixWorld(!0);const s={};s.body=new he,i.traverse(v=>{const b=/^pv_(\w+)$/.exec(v.name);b&&os.includes(b[1])&&(s[b[1]]=v.getWorldPosition(new he))});for(const v of os)if(!s[v])throw new Error(`${n}: нет шарнира ${v}`);const a=[],r=[],o=new Be;i.traverse(v=>{const b=v;if(!b.isMesh)return;const S=b.userData.bone??b.parent?.userData.bone??"torso",g=Math.max(0,os.indexOf(S)),f=b.material,E=(b.geometry.index?b.geometry.toNonIndexed():b.geometry.clone()).applyMatrix4(b.matrixWorld);if(f.name==="glass"){for(const N of Object.keys(E.attributes))N!=="position"&&N!=="normal"&&E.deleteAttribute(N);E.translate(-s[S].x,-s[S].y,-s[S].z),r.push({bone:S,geo:E,mat:new en({color:f.color,transparent:!0,opacity:.3,roughness:.05,depthWrite:!1})});return}const y=f.name.startsWith("face"),_=E.attributes.position.count,R=new Float32Array(_*3),T=new Float32Array(_*2),I=new Uint16Array(_*4),x=new Float32Array(_*4);o.copy(y?new Be(1,1,1):f.color);const w=y?E.attributes.uv:null;for(let N=0;N<_;N++)R[N*3]=o.r,R[N*3+1]=o.g,R[N*3+2]=o.b,w?(T[N*2]=w.getX(N)*.5,T[N*2+1]=w.getY(N)):(T[N*2]=.75,T[N*2+1]=.5),I[N*4]=g,x[N*4]=1;for(const N of Object.keys(E.attributes))N!=="position"&&N!=="normal"&&E.deleteAttribute(N);E.setAttribute("color",new Gt(R,3)),E.setAttribute("uv",new Gt(T,2)),E.setAttribute("skinIndex",new Gt(I,4)),E.setAttribute("skinWeight",new Gt(x,4)),a.push(E)});const c=Li(a);if(a.forEach(v=>v.dispose()),!c)throw new Error(`${n}: пустая модель`);c.computeBoundingSphere();const l=document.createElement("canvas");l.width=512,l.height=256;const d=l.getContext("2d");d.fillStyle="#fff",d.fillRect(0,0,512,256),t&&d.drawImage(t,0,0,256,256);const h=new pn(l);h.colorSpace=Ht,h.flipY=!1,h.anisotropy=4;const u=new en({map:h,vertexColors:!0,roughness:.5});return{id:n,geo:c,mat:u,pivots:s,extras:r}}const Qi=[{id:"rookie",ru:"Новичок",en:"Rookie",price:0,ads:0},{id:"sparky",ru:"Искра",en:"Sparky",price:150,ads:1},{id:"nana",ru:"Нана",en:"Nana",price:200,ads:1},{id:"biscuit",ru:"Пончик",en:"Biscuit",price:250,ads:2},{id:"patch",ru:"Пират",en:"Patch",price:300,ads:2},{id:"chomps",ru:"Кусь",en:"Chomps",price:350,ads:2},{id:"orbit",ru:"Орбита",en:"Orbit",price:400,ads:3},{id:"clank",ru:"Дзынь",en:"Clank",price:450,ads:3},{id:"wizzle",ru:"Чародей",en:"Wizzle",price:500,ads:3},{id:"bleep",ru:"Бип",en:"Bleep",price:600,ads:4},{id:"zoom",ru:"Вжух",en:"Zoom",price:800,ads:4},{id:"mittens",ru:"Мурка",en:"Mittens",price:300,ads:2},{id:"mumbo",ru:"Мумик",en:"Mumbo",price:350,ads:2},{id:"pumpky",ru:"Тыквер",en:"Pumpky",price:450,ads:3},{id:"zeeb",ru:"Зиб",en:"Zeeb",price:550,ads:3},{id:"bjorn",ru:"Бьорн",en:"Bjorn",price:650,ads:3},{id:"roxy",ru:"Рокси",en:"Roxy",price:750,ads:4},{id:"shadow",ru:"Тень",en:"Shadow",price:900,ads:4}],Ta=n=>Qi.find(e=>e.id===n)??Qi[0];function Pg(n,e,t){const i=t==="chaos"?2:t==="normal"?1.5:1;return Math.round((Math.floor(n/2)+(e?30:0))*i)}const rn=256,Ro={dust:{n:10,colors:[16777215,15263976,14078148],speed:[1.5,3],up:[.5,1.5],size:[.12,.22],life:[.35,.6],grav:4,spread:1},confetti:{n:40,colors:[15220794,16237596,3125322,2782440,10181072,16740277],speed:[2,6],up:[6,11],size:[.12,.2],life:[1.2,1.8],grav:14,spread:1},coin:{n:10,colors:[16765498,16774048,16758784],speed:[1.5,3.5],up:[2,4],size:[.08,.14],life:[.35,.55],grav:6,spread:1},wood:{n:8,colors:[13141834,14723178,9065768],speed:[1,2.5],up:[1,2.5],size:[.1,.18],life:[.3,.5],grav:10,spread:1},lava:{n:16,colors:[16734751,16761402,8002056],speed:[1.5,4],up:[3,7],size:[.12,.22],life:[.5,.9],grav:12,spread:1},trail:{n:2,colors:[16777215],speed:[.2,.6],up:[.3,.9],size:[.12,.2],life:[.45,.7],grav:0,spread:1},puff:{n:12,colors:[16777215,16052972,15131094],speed:[1.6,3],up:[.3,1.1],size:[.32,.58],life:[.45,.8],grav:-.8,spread:1,ring:.6},poof:{n:14,colors:[16777215,14674687],speed:[1,2.2],up:[.5,2],size:[.2,.35],life:[.4,.7],grav:-1,spread:1}};class Co{constructor(e){this.p=new Float32Array(rn*3),this.v=new Float32Array(rn*3),this.life=new Float32Array(rn),this.max=new Float32Array(rn),this.size=new Float32Array(rn),this.grav=new Float32Array(rn),this.spin=new Float32Array(rn),this.next=0,this.m=new Qt,this.q=new Ua,this.e=new rf,this.s=new he,this.t=new he,this.c=new Be,this.mesh=new an(new Dn(1,1,1),new zs({color:16777215}),rn),this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,this.mesh.instanceColor=new Vc(new Float32Array(rn*3).fill(1),3);for(let t=0;t<rn;t++)this.mesh.setMatrixAt(t,this.m.makeScale(0,0,0));e.add(this.mesh)}emit(e,t,i=1,s){const a=s?.length?{...Ro[e],colors:s}:Ro[e],r=Math.round(a.n*i),o=c=>c[0]+Math.random()*(c[1]-c[0]);for(let c=0;c<r;c++){const l=this.next;this.next=(this.next+1)%rn;const d=Math.random()*Math.PI*2,h=o(a.speed),u=a.ring??0;this.p[l*3]=t.x+Math.cos(d)*u,this.p[l*3+1]=t.y,this.p[l*3+2]=t.z+Math.sin(d)*u,this.v[l*3]=Math.cos(d)*h,this.v[l*3+1]=o(a.up),this.v[l*3+2]=Math.sin(d)*h,this.life[l]=this.max[l]=o(a.life),this.size[l]=o(a.size),this.grav[l]=a.grav,this.spin[l]=(Math.random()-.5)*12,this.mesh.setColorAt(l,this.c.setHex(a.colors[Math.random()*a.colors.length|0]))}this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}update(e){let t=!1;for(let i=0;i<rn;i++){if(this.life[i]<=0)continue;t=!0,this.life[i]-=e;const s=i*3;this.v[s+1]-=this.grav[i]*e;const a=1-Math.min(1,e*2.5);this.v[s]*=a,this.v[s+2]*=a,this.p[s]+=this.v[s]*e,this.p[s+1]+=this.v[s+1]*e,this.p[s+2]+=this.v[s+2]*e;const r=Math.max(0,this.life[i]/this.max[i]),o=this.life[i]>0?this.size[i]*(.3+.7*r):0,c=(this.max[i]-this.life[i])*this.spin[i];this.q.setFromEuler(this.e.set(c,c*.7,0)),this.mesh.setMatrixAt(i,this.m.compose(this.t.set(this.p[s],this.p[s+1],this.p[s+2]),this.q,this.s.setScalar(o)))}t&&(this.mesh.instanceMatrix.needsUpdate=!0)}}const Bt=256;function fl(n,e=Bt){const t=document.createElement("canvas");t.width=t.height=e,n(t.getContext("2d"));const i=new pn(t);return i.colorSpace=Ht,i.wrapS=i.wrapT=ii,i.anisotropy=4,i}function ul(n){const e=[];let t=n;const i=()=>(t=t*16807%2147483647)/2147483647;for(let a=0;a<4;a++)for(let r=0;r<5;r++){const o=1<<a;e.push({fx:Math.round((i()*2-1)*3*o),fy:Math.round((i()*2-1)*3*o),ph:i()*Math.PI*2,a:1/o})}const s=e.reduce((a,r)=>a+r.a,0);return(a,r)=>{let o=0;for(const c of e)o+=c.a*Math.sin((c.fx*a+c.fy*r)*Math.PI*2+c.ph);return .5+.5*(o/s)*1.8}}function hl(n,e){e=Math.min(1,Math.max(0,e));for(let t=1;t<n.length;t++)if(e<=n[t][0]){const[i,s]=n[t-1],[a,r]=n[t],o=(e-i)/(a-i);return[0,1,2].map(c=>s[c]+(r[c]-s[c])*o)}return n[n.length-1][1]}function Ig(n,e){const t=ul(n);return fl(i=>{const s=i.createImageData(Bt,Bt);for(let a=0;a<Bt;a++)for(let r=0;r<Bt;r++){const[o,c,l]=hl(e,t(r/Bt,a/Bt)),d=(a*Bt+r)*4;s.data[d]=o,s.data[d+1]=c,s.data[d+2]=l,s.data[d+3]=255}i.putImageData(s,0,0)})}const Dg=()=>{let n=42;const e=()=>(n=n*16807%2147483647)/2147483647,t=Array.from({length:22},()=>[e(),e()]),i=ul(9);return fl(s=>{const a=s.createImageData(Bt,Bt);for(let r=0;r<Bt;r++)for(let o=0;o<Bt;o++){const c=o/Bt,l=r/Bt;let d=9,h=9;for(const[f,E]of t){const y=Math.min(Math.abs(c-f),1-Math.abs(c-f)),_=Math.min(Math.abs(l-E),1-Math.abs(l-E)),R=Math.hypot(y,_);R<d?(h=d,d=R):R<h&&(h=R)}const u=(h-d)*14+(i(c,l)-.5)*.35,[v,b,S]=hl([[0,[255,250,190]],[.12,[255,205,60]],[.3,[255,120,20]],[.5,[200,55,15]],[.75,[110,28,12]],[1,[70,18,10]]],u),g=(r*Bt+o)*4;a.data[g]=v,a.data[g+1]=b,a.data[g+2]=S,a.data[g+3]=255}s.putImageData(a,0,0)})},Ug=()=>{const n=Ig(5,[[0,[170,215,245]],[.6,[205,235,252]],[1,[245,252,255]]]),e=n.image.getContext("2d");e.strokeStyle="rgba(255,255,255,.7)",e.lineWidth=3;for(let t=0;t<6;t++)e.beginPath(),e.moveTo(t*50-40,0),e.lineTo(t*50+60,Bt),e.stroke();return e.strokeStyle="rgba(80,140,190,.6)",e.lineWidth=1.5,e.beginPath(),e.moveTo(40,60),e.lineTo(95,110),e.lineTo(88,160),e.moveTo(95,110),e.lineTo(150,128),e.stroke(),e.strokeStyle="rgba(255,255,255,.95)",e.lineWidth=10,e.strokeRect(5,5,Bt-10,Bt-10),n.needsUpdate=!0,n};var ut=(n=>(n[n.None=0]="None",n[n.Fire=1]="Fire",n[n.Ice=2]="Ice",n[n.Wet=3]="Wet",n[n.Shock=4]="Shock",n[n.Slime=5]="Slime",n))(ut||{});const Nt=2,Ng=7,Gi=12,Lo=1.6,Og=10,Po=80,Fg=40,Ds=.3,zt=new ea,kg=700;function Bg(){const n=document.createElement("canvas");n.width=64,n.height=128;const e=n.getContext("2d"),t=()=>{e.beginPath(),e.moveTo(32,4),e.bezierCurveTo(44,40,60,62,58,92),e.bezierCurveTo(56,116,42,126,32,126),e.bezierCurveTo(22,126,8,116,6,92),e.bezierCurveTo(4,62,20,40,32,4),e.closePath()};e.filter="blur(5px)";const i=e.createLinearGradient(0,0,0,128);i.addColorStop(0,"rgba(230,40,0,0)"),i.addColorStop(.3,"rgba(240,60,0,.9)"),i.addColorStop(1,"rgba(255,120,0,1)"),e.fillStyle=i,t(),e.fill(),e.save(),e.translate(32,128),e.scale(.55,.6),e.translate(-32,-128);const s=e.createLinearGradient(0,0,0,128);s.addColorStop(0,"rgba(255,200,40,0)"),s.addColorStop(.45,"rgba(255,210,40,1)"),s.addColorStop(1,"rgba(255,245,170,1)"),e.fillStyle=s,t(),e.fill(),e.restore();const a=new pn(n);return a.colorSpace=Ht,a}function Gg(){const n=document.createElement("canvas");n.width=64,n.height=128;const e=n.getContext("2d"),t=[[38,4],[22,52],[36,56],[18,124],[46,62],[31,58],[48,4]],i=()=>{e.beginPath(),e.moveTo(...t[0]);for(const a of t.slice(1))e.lineTo(...a);e.closePath()};e.shadowColor="rgba(255,220,40,1)",e.shadowBlur=14,e.fillStyle="rgba(255,200,20,1)",i(),e.fill(),e.shadowBlur=0,e.save(),e.translate(33,64),e.scale(.55,.85),e.translate(-33,-64),e.fillStyle="rgba(255,255,230,1)",i(),e.fill(),e.restore();const s=new pn(n);return s.colorSpace=Ht,s}function Hg(){const n=document.createElement("canvas");n.width=n.height=64;const e=n.getContext("2d"),t=e.createRadialGradient(32,32,2,32,32,30);return t.addColorStop(0,"rgba(255,255,255,.95)"),t.addColorStop(.45,"rgba(255,255,255,.6)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new pn(n)}class Io{constructor(e,t=Bg(),i=kg,s=!1){this.max=i,this.n=0,this.t=0;const a=new Wn(1,1.5).translate(0,.75,0),r=a.clone().rotateY(Math.PI/2),o=Li([a,r]);this.mesh=new an(o,new Xt({map:t,transparent:!0,depthWrite:!1,side:ln,blending:s?bs:ji}),i),this.mesh.count=0,this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,e.add(this.mesh)}add(e,t,i,s,a){if(this.n>=this.max||s<.05)return;const r=1+Math.sin(this.t*13+a*7.1)*.18+Math.sin(this.t*23+a*3.3)*.1;zt.position.set(e,t,i),zt.rotation.set(Math.sin(this.t*5+a)*.12,a*2.4,0),zt.scale.set(s*(1.1-(r-1)*.5),s*r,s*(1.1-(r-1)*.5)),zt.updateMatrix(),this.mesh.setMatrixAt(this.n++,zt.matrix)}commit(e){this.t+=e,this.mesh.count=this.n,this.mesh.visible=this.n>0,this.n&&(this.mesh.instanceMatrix.needsUpdate=!0),this.n=0}clear(){this.n=0,this.mesh.count=0}}function Do(n){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),i=t.createRadialGradient(64,64,0,64,64,64);i.addColorStop(0,n?"rgba(255,252,183,.97)":"rgba(153,226,255,.8)"),i.addColorStop(.78,n?"rgba(83,223,255,.92)":"rgba(43,156,221,.75)"),i.addColorStop(1,n?"rgba(70,195,255,0)":"rgba(43,156,221,0)"),t.fillStyle=i,t.fillRect(0,0,128,128),t.strokeStyle=n?"rgba(255,255,222,.85)":"rgba(222,247,255,.55)",t.lineWidth=2;for(const a of[16,29,43])t.beginPath(),t.ellipse(61,62,a,a*.8,-.3,0,Math.PI*2),t.stroke();const s=new pn(e);return s.colorSpace=Ht,s}function zg(){const n=document.createElement("canvas");n.width=n.height=128;const e=n.getContext("2d"),t=e.createRadialGradient(48,43,4,64,64,64);t.addColorStop(0,"rgba(205,255,98,.98)"),t.addColorStop(.78,"rgba(77,208,23,.94)"),t.addColorStop(1,"rgba(40,151,10,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);for(const[s,a,r]of[[43,44,13],[80,54,9],[63,84,12],[91,83,6],[36,74,7]]){const o=e.createRadialGradient(s-r*.35,a-r*.4,0,s,a,r);o.addColorStop(0,"rgba(249,255,210,.98)"),o.addColorStop(.4,"rgba(162,255,69,.75)"),o.addColorStop(1,"rgba(33,125,7,.82)"),e.fillStyle=o,e.beginPath(),e.arc(s,a,r,0,Math.PI*2),e.fill()}const i=new pn(n);return i.colorSpace=Ht,i}class Vg{constructor(e,t,i,s){this.half=t,this.flames=i,this.bolts=s,this.shocked=[],this.dirty=!0,this.burning=[],this.onReact=null,this.n=Math.round(t*2/Nt);const a=this.n*this.n;this.state=new Uint8Array(a),this.timer=new Float64Array(a);const r=new Wn(Nt*.98,Nt*.98).rotateX(-Math.PI/2),o=new Wn(Nt*1.35,Nt*1.35).rotateX(-Math.PI/2),c=new an(o,new Xt({map:Hg(),color:2758156,transparent:!0,opacity:.7,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4}),a),l=Ug(),d=new an(r,new en({map:l,color:14218239,roughness:.08,transparent:!0,opacity:.92,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),a),h=new Wn(Nt*1.15,Nt*1.15).rotateX(-Math.PI/2),u=(v,b,S=0)=>{const g=new an(h,new en({map:v,roughness:.05,emissive:S,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),a);return g.position.y=b,g};c.position.y=.06,d.position.y=.04,this.meshes=[c,d,u(Do(!1),.035),u(Do(!0),.05,1519668),u(zg(),.045)];for(const v of this.meshes)v.count=0,v.frustumCulled=!1,v.receiveShadow=!0,e.add(v)}idx(e,t){const i=Math.floor((e+this.half)/Nt),s=Math.floor((t+this.half)/Nt);return i<0||s<0||i>=this.n||s>=this.n?-1:s*this.n+i}center(e,t){return t.set(e%this.n*Nt-this.half+Nt/2,0,Math.floor(e/this.n)*Nt-this.half+Nt/2)}at(e,t){const i=this.idx(e,t);return i<0?0:this.state[i]}setCell(e,t,i){this.state[e]!==t&&(this.dirty=!0),this.state[e]=t,this.timer[e]=i}react(e,t){if(!this.onReact)return;const i=this.center(t,zt.position);this.onReact(e,i.x,i.z)}ignite(e,t,i=Ng){const s=this.idx(e,t);if(!(s<0))switch(this.state[s]){case 2:this.setCell(s,3,Gi),this.react("melt",s);break;case 3:this.setCell(s,3,Gi),this.react("steam",s);break;case 5:this.setCell(s,1,i*2),this.react("slimeFire",s);break;case 4:break;default:this.setCell(s,1,Math.max(this.timer[s],i))}}freeze(e){return this.state[e]===1?(this.setCell(e,3,Gi),this.react("steam",e),!0):(this.setCell(e,2,0),!1)}freezeAt(e,t){const i=this.idx(e,t);return i>=0&&this.freeze(i)}wetAt(e,t){const i=this.idx(e,t);if(i<0)return;const s=this.state[i];if(s!==2){if(s===4){this.setCell(i,4,Lo);return}this.setCell(i,3,Gi),s===1&&this.react("steam",i)}}shockAt(e,t){const i=this.idx(e,t);if(this.state[i]!==3&&this.state[i]!==4)return 0;const s=[],a=new Set;let r=!1;const o=c=>{const l=this.state[c];s.length>=Po||a.has(c)||l!==3&&l!==4||(s.push(c),a.add(c),l===3&&(r=!0),this.setCell(c,4,Lo))};o(i);for(let c=0;c<s.length&&s.length<Po;c++){const l=s[c],d=l%this.n;d>0&&o(l-1),d+1<this.n&&o(l+1),o(l-this.n),o(l+this.n)}return r&&this.react("shock",i),s.length}slimeAt(e,t){const i=this.idx(e,t),s=this.state[i];(s===0||s===3||s===5)&&this.setCell(i,5,Og)}counts(){const e=[0,0,0,0,0,0];for(const t of this.state)e[t]++;return{fire:e[1],ice:e[2],wet:e[3],shock:e[4],slime:e[5]}}reset(){this.state.fill(0),this.timer.fill(0),this.burning.length=0,this.shocked.length=0;for(const e of this.meshes)e.count=0;this.dirty=!1}update(e){for(let i=0;i<this.state.length;i++){const s=this.state[i];s===0||s===2||(this.timer[i]-=e,this.timer[i]<=0&&(s===4?this.setCell(i,3,Gi):this.setCell(i,0,0)))}this.dirty&&this.rebuild();for(const i of this.burning){const s=i%this.n*Nt-this.half+Nt/2,a=Math.floor(i/this.n)*Nt-this.half+Nt/2,r=Math.min(1,this.timer[i]/1.2);this.flames.add(s-.45+i*37%7/10,.07,a-.3+i*13%5/10,1.15*r,i),this.flames.add(s+.4-i*11%6/10,.07,a+.35-i*29%7/10,.85*r,i+.5)}let t=Math.min(Fg,this.shocked.length);for(let i=0;i<this.shocked.length&&t>0;i++){const s=this.shocked.length-i;if(t<s&&Math.random()*s>=t)continue;const{x:a,z:r}=this.center(this.shocked[i],zt.position);this.bolts.add(a+(Math.random()-.5)*Nt,.2+Math.random()*.4,r+(Math.random()-.5)*Nt,.9+Math.random()*.5,Math.random()*10),t--}}rebuild(){this.dirty=!1;for(const e of this.meshes)e.count=0;this.burning.length=0,this.shocked.length=0;for(let e=0;e<this.state.length;e++){const t=this.state[e];if(t===0)continue;this.center(e,zt.position),zt.rotation.set(0,0,0),zt.scale.setScalar(1),zt.updateMatrix();const i=this.meshes[t-1];i.setMatrixAt(i.count++,zt.matrix),t===1&&this.burning.push(e),t===4&&this.shocked.push(e)}for(const e of this.meshes)e.count&&(e.instanceMatrix.needsUpdate=!0)}}const Hi=260;class Wg{constructor(e,t){this.half=t,this.pos=new Float32Array(Hi*3),this.on=!1,this.mesh=new an(new Dn(.12,.7,.12),new Xt({color:13627391,transparent:!0,opacity:.8}),Hi),this.mesh.frustumCulled=!1,this.mesh.count=0,e.add(this.mesh);for(let i=0;i<Hi;i++)this.respawn(i,Math.random()*26)}respawn(e,t=26){this.pos[e*3]=(Math.random()*2-1)*this.half,this.pos[e*3+1]=t,this.pos[e*3+2]=(Math.random()*2-1)*this.half}update(e){if(!this.on){this.mesh.count=0;return}for(let t=0;t<Hi;t++)this.pos[t*3+1]-=e*22,this.pos[t*3+1]<0&&this.respawn(t),zt.position.set(this.pos[t*3],this.pos[t*3+1],this.pos[t*3+2]),zt.rotation.set(0,0,0),zt.scale.setScalar(1),zt.updateMatrix(),this.mesh.setMatrixAt(t,zt.matrix);this.mesh.count=Hi,this.mesh.instanceMatrix.needsUpdate=!0}}const da=-2.5,ls=.45;class Xg{constructor(e,t){this.level=da,this.rising=0,this.top=ls,this.from=da,this.tex=Dg(),this.tex.wrapS=this.tex.wrapT=ii,this.tex.repeat.set(t/3,t/3),this.mesh=new ot(new Wn(t*2+6,t*2+6).rotateX(-Math.PI/2),new Xt({map:this.tex,color:16777215})),this.mesh.visible=!1,e.add(this.mesh)}rise(e,t=ls){this.rising=e,this.top=t,this.from=this.level,this.mesh.visible=!0}reset(){this.level=da,this.rising=0,this.top=ls,this.mesh.visible=!1,this.mesh.position.y=da}update(e){this.mesh.visible&&(this.rising>0&&(this.level=Math.min(this.top,this.level+(this.top-this.from)/this.rising*e),this.level>=this.top&&(this.rising=0)),this.mesh.position.y=this.level,this.tex.offset.x+=e*.03,this.tex.offset.y+=e*.02)}}const Uo="button";let No=null,Oo=0;function Vs(){window.__tapOn||(window.__tapOn=!0,addEventListener("pointerup",n=>{if(n.pointerType==="mouse")return;const e=n.target?.closest?.(Uo);!e||e.disabled||(No=e,Oo=performance.now(),e.click())},!0),addEventListener("click",n=>{if(!n.isTrusted)return;const e=n.target?.closest?.(Uo);e&&e===No&&performance.now()-Oo<800&&(n.stopImmediatePropagation(),n.preventDefault())},!0))}const Us=[3,5,7,10],wi={fire:{ru:{m:"огненный",f:"огненная",pl:"огненные",gpl:"огненных"},en:"fire"},ice:{ru:{m:"ледяной",f:"ледяная",pl:"ледяные",gpl:"ледяных"},en:"ice"},giant:{ru:{m:"гигантский",f:"гигантская",pl:"гигантские",gpl:"гигантских"},en:"giant"},bouncy:{ru:{m:"прыгучий",f:"прыгучая",pl:"прыгучие",gpl:"прыгучих"},en:"bouncy"},fast:{ru:{m:"быстрый",f:"быстрая",pl:"быстрые",gpl:"быстрых"},en:"fast"},plain:{ru:{m:"обычный",f:"обычная",pl:"обычные",gpl:"обычных"},en:"plain"}},Pa={chicken:{ru:{g:"f",one:"курица",few:"курицы",many:"куриц"},en:["chicken","chickens"]},cat:{ru:{g:"m",one:"кот",few:"кота",many:"котов"},en:["cat","cats"]},shark:{ru:{g:"f",one:"акула",few:"акулы",many:"акул"},en:["shark","sharks"]},banana:{ru:{g:"m",one:"банан",few:"банана",many:"бананов"},en:["banana","bananas"]},meteor:{ru:{g:"m",one:"метеорит",few:"метеорита",many:"метеоритов"},en:["meteor","meteors"]},bomb:{ru:{g:"f",one:"бомба",few:"бомбы",many:"бомб"},en:["bomb","bombs"]},snowman:{ru:{g:"m",one:"снеговик",few:"снеговика",many:"снеговиков"},en:["snowman","snowmen"]},slime:{ru:{g:"m",one:"слайм",few:"слайма",many:"слаймов"},en:["slime","slimes"]},zombie:{ru:{g:"m",one:"зомби",few:"зомби",many:"зомби"},en:["zombie","zombies"]},dino:{ru:{g:"m",one:"динозавр",few:"динозавра",many:"динозавров"},en:["dinosaur","dinosaurs"]},ufo:{ru:{g:"m",one:"НЛО",few:"НЛО",many:"НЛО"},en:["UFO","UFOs"]},tornado:{ru:{g:"m",one:"торнадо",few:"торнадо",many:"торнадо"},en:["tornado","tornadoes"]},bee:{ru:{g:"f",one:"пчела",few:"пчелы",many:"пчёл"},en:["bee","bees"]},boulder:{ru:{g:"m",one:"валун",few:"валуна",many:"валунов"},en:["boulder","boulders"]},frog:{ru:{g:"f",one:"лягушка",few:"лягушки",many:"лягушек"},en:["frog","frogs"]}},yi=Object.keys(wi),Ai=Object.keys(Pa);function Kg(n){const e=n%10,t=n%100;return e===1&&t!==11?"one":e>=2&&e<=4&&(t<12||t>14)?"few":"many"}function Ws(n,e,t){if(of()==="en")return[wi[e].en,Pa[t].en[n===1?0:1]];const i=wi[e].ru,s=Pa[t].ru,a=Kg(n);return a==="one"?[s.g==="f"?i.f:i.m,s.one]:a==="few"?[s.g==="f"?i.pl:i.gpl,s.few]:[i.gpl,s.many]}function Fo(n,e,t){const[i,s]=Ws(n,e,t);return`${n} ${i} ${s}!`.toUpperCase()}const ko={chicken:0,cat:1,shark:2,banana:3,meteor:4,bomb:5,snowman:6,slime:7,zombie:14,dino:15,ufo:16,tornado:17,bee:18,boulder:19,frog:20,fire:8,ice:9,giant:10,bouncy:11,fast:12,plain:13},jg=n=>pl(n),pl=n=>`${ko[n]%4*33.333}% ${Math.floor(ko[n]/4)*20}%`,Bo=5,Yg=.6,Ns=66,Xi=.34,ml=.11,mi=Xi+ml,Go=.22,Ho=.14,$g=[Us,yi,Ai],qg=[12.8,14,15.2],di=(n,e)=>(n%e+e)%e;class Zg{constructor(e,t){this.lanes=[],this.stopped=0,this.landed=0,this.autoT=0,this.onDone=null,this.forced=null,this.open=!1,this.hideTimer=0,Qg(),Vs(),this.ru=/[а-яё]/i.test(t),this.box=document.createElement("div"),this.box.className="reels",this.box.inert=!0;const i=document.createElement("div");i.className="reels-frame",$g.forEach((o,c)=>{const l=document.createElement("div");l.className="reel";const d=document.createElement("div");d.className="reel-track";const h=Array.from({length:5},(u,v)=>{const b=document.createElement("div");b.className="reel-symbol",b.style.top=`${50+(v-2.5)*Ns}%`;const S=document.createElement(c===0?"span":"i");return b.appendChild(S),d.appendChild(b),S});l.appendChild(d),i.appendChild(l),this.lanes.push({cell:l,track:d,slots:h,list:o,speed:qg[c],position:0,painted:-1,brake:null})}),this.btn=document.createElement("button"),this.btn.type="button",this.btn.className="reels-stop",this.btn.disabled=!0;const s=document.createElement("span");s.className="reels-stop-label",s.textContent=t,this.btn.appendChild(s),this.btn.setAttribute("aria-label",t);const a=new Image,r=/[а-яё]/i.test(t)?"ru":"en";a.onload=()=>{this.btn.style.backgroundImage=`url(${a.src})`,this.btn.classList.add("art")},a.src=`./assets/ui/stop_${r}.webp?v=mwpzjthk`,this.btn.addEventListener("click",()=>this.press()),this.badge=document.createElement("b"),this.badge.className="reels-count",this.btn.appendChild(this.badge),this.box.append(i,this.btn),e.appendChild(this.box),addEventListener("keydown",o=>{!this.spinning||o.code!=="KeyE"&&o.code!=="Enter"||(o.preventDefault(),o.repeat||this.press())})}spin(e,t=null){clearTimeout(this.hideTimer),this.onDone=e,this.forced=t,this.stopped=0,this.landed=0,this.autoT=Bo;for(const i of this.lanes)i.position=Math.random()*i.list.length,i.brake=null,i.cell.classList.add("rolling"),i.cell.style.transform="",this.paint(i);this.box.inert=!1,this.box.classList.add("show"),this.btn.disabled=!1,this.open=!0,this.renderControls(),Ve.play("spin",.04)}hide(){clearTimeout(this.hideTimer),this.open=!1,this.onDone=null,this.btn.disabled=!0,this.box.inert=!0,this.box.classList.remove("show")}get spinning(){return this.open&&this.landed<this.lanes.length}rect(){return this.open?this.box.getBoundingClientRect():null}highlight(e){this.btn.classList.toggle("tut-glow",e)}press(){!this.open||this.stopped===this.lanes.length||(Ve.play("click",.05),this.stop(),this.autoT=Bo)}stop(){const e=this.lanes[this.stopped],t=[this.forced?.n,this.forced?.adj,this.forced?.noun][this.stopped],i=t===void 0?-1:e.list.indexOf(t),s=e.position;let a=Math.ceil(s+2);if(i>=0){const r=Math.ceil(s+.6);a=r+di(i-r,e.list.length)}e.brake={from:s,to:a,elapsed:0},this.stopped++,this.renderControls()}update(e){if(!this.open)return;for(;this.stopped<this.lanes.length&&e>=this.autoT;)this.advance(this.autoT),e-=this.autoT,this.stop(),this.autoT=Yg;if(this.autoT-=e,this.advance(e),this.landed!==this.lanes.length||!this.onDone)return;const t={n:Us[di(this.lanes[0].position,Us.length)],adj:yi[di(this.lanes[1].position,yi.length)],noun:Ai[di(this.lanes[2].position,Ai.length)]},i=this.onDone;this.onDone=null,this.hideTimer=window.setTimeout(()=>this.hide(),450),i(t)}advance(e){for(const t of this.lanes){const i=t.brake;if(!i){t.position=(t.position+t.speed*e)%t.list.length,this.paint(t);continue}if(i.elapsed>=mi+Go)continue;const s=i.elapsed;if(i.elapsed+=e,s<mi&&(t.position=Jg(i,t.speed),this.paint(t),i.elapsed>=mi&&(this.landed++,t.cell.classList.remove("rolling"),Ve.play("reelstop",.02,1,[1,1.12,1.26][this.landed-1]??1))),i.elapsed>=mi){const a=(i.elapsed-mi)/Go;t.cell.style.transform=a<1?`scale(${1+.1*Math.sin(Math.PI*a)*(1-a)})`:""}}}paint(e){const t=Math.floor(e.position),i=di(t,e.list.length);e.painted!==i&&(e.slots.forEach((s,a)=>{const r=e.list[di(i+2-a,e.list.length)];if(typeof r=="number")s.textContent=String(r);else if(s.style.backgroundPosition=pl(r),r in wi){const o=wi[r];s.dataset.cap=this.ru?o.ru.pl:o.en}}),e.painted=i),e.track.style.transform=`translateY(${(e.position-t)*Ns}%)`}renderControls(){const e=this.lanes.length-this.stopped;this.badge.textContent=String(e),this.badge.style.display=e?"":"none",this.btn.disabled=e===0,this.lanes.forEach(({cell:t},i)=>t.classList.toggle("next",i===this.stopped))}}function Jg({from:n,to:e,elapsed:t},i){if(t<Xi){const a=t/Xi,r=e+Ho-n,o=Math.min(i*Xi,3*r);return n+r*a*a*(3-2*a)+o*a*(1-a)**2}if(t>=mi)return e;const s=(t-Xi)/ml;return e+Ho*(1-s)**2*(1+2*s)}let zo=!1;function Qg(){if(zo)return;zo=!0;const n=document.createElement("style");n.textContent=`
.reels{--margin:max(18px,env(safe-area-inset-left),env(safe-area-inset-right));
  --ink:#2a1250;--font:Nunito,"Arial Black",system-ui,sans-serif;
  --w:min(91vh,728px,calc(100vw - 2*var(--margin)));--y:0%;
  position:absolute;left:50%;z-index:7;bottom:calc(env(safe-area-inset-bottom) + max(10px,2vh));
  display:flex;align-items:center;gap:calc(var(--w)*.025);width:var(--w);pointer-events:none;
  opacity:0;visibility:hidden;transform:translate(-50%,var(--y)) scale(.85);
  transition:transform .22s ease-in,opacity .22s ease-in,visibility 0s .22s}
@media (pointer:coarse){.reels{--y:-50%;bottom:auto;top:calc(46% + (env(safe-area-inset-top) - env(safe-area-inset-bottom))/2)}}
.reels.show{opacity:1;visibility:visible;transform:translate(-50%,var(--y)) scale(1);
  transition:transform .32s cubic-bezier(.3,1.55,.55,1),opacity .18s ease-out,visibility 0s}
.reels-frame{position:relative;flex:1;min-width:0;display:flex;gap:calc(var(--w)*.012);padding:calc(var(--w)*.018);
  border-radius:calc(var(--w)*.04);border:clamp(3px,calc(var(--w)*.008),6px) solid var(--ink);
  background:linear-gradient(#ffe481 0%,#ffbd44 12%,#9e36cd 32%,#7322b1 65%,#e49126 95%,#ffe383);
  box-shadow:inset 0 0 0 clamp(2px,calc(var(--w)*.006),4px) #ffc13d,inset 0 2px #fff5c1,
    0 calc(var(--w)*.012) #4d1784,0 calc(var(--w)*.016) var(--ink)}
/* Лампочки ложатся на кайму, чтобы не сужать окна лент. */
.reels-frame::before,.reels-frame::after{content:'';position:absolute;z-index:2;pointer-events:none;
  left:4%;right:4%;height:calc(var(--w)*.017);border-radius:999px;
  background:radial-gradient(circle,#fffde0 0 24%,#ffeb79 27% 39%,#ffb92e8c 43%,transparent 64%) center/11.111% 100% repeat-x}
.reels-frame::before{top:0}
.reels-frame::after{bottom:0}
.reel{position:relative;flex:1;min-width:0;height:calc(var(--w)*.2);border-radius:calc(var(--w)*.025);overflow:hidden;
  background:linear-gradient(#e8d4c3,#fff9e8 34%,#fffdf3 64%,#ead6bf);color:#fff9e8;
  font:900 calc(var(--w)*.105)/1 var(--font);white-space:nowrap;
  -webkit-text-stroke:clamp(3px,calc(var(--w)*.009),7px) var(--ink);paint-order:stroke fill;text-shadow:0 .08em #522257}
.reel:first-child{flex:.65}
.reel-track{position:absolute;inset:0}
.reel.rolling .reel-track{filter:blur(.7px);will-change:transform}
.reel-symbol{position:absolute;inset-inline:0;height:${Ns}%;display:grid;
  grid-template:minmax(0,1fr)/minmax(0,1fr);place-items:center}
.reel i{display:block;width:min(100%,calc(var(--w)*.16));aspect-ratio:1;background:url(./assets/reel.webp?v=mwpzjthk) 0 0/400% 600% no-repeat}
/* значок свойства поменьше и чуть выше — подпись под ним остаётся в своей ячейке, на соседей не налезает */
.reel i[data-cap]{position:relative;width:min(100%,calc(var(--w)*.096));margin-bottom:calc(var(--w)*.03)}
.reel i[data-cap]::after{content:attr(data-cap);position:absolute;left:50%;top:94%;transform:translateX(-50%);
  font-size:max(9px,calc(var(--w)*.026));line-height:1;letter-spacing:.01em;text-transform:uppercase;font-style:normal;
  -webkit-text-stroke:max(2px,calc(var(--w)*.005)) var(--ink);text-shadow:0 .06em #522257}
/* Тень скрывает обрезку символов у краёв, а блик выгибает окно по центру. */
.reel::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(#4e286a65,transparent 34%,#ffffff24 49%,transparent 68%,#4e286a73);
  border-radius:inherit;box-shadow:inset 0 0 0 max(2px,calc(var(--w)*.004)) #351642}
.reels-stop{position:relative;isolation:isolate;pointer-events:none;flex:none;width:calc(var(--w)*.22);height:calc(var(--w)*.22);
  min-width:56px;min-height:56px;padding:0;border-radius:50%;cursor:pointer;touch-action:manipulation;
  background:linear-gradient(#ff7479,#f72d47 48%,#d50c36 75%,#a91237);color:#fff;border:clamp(3px,calc(var(--w)*.009),6px) solid #321034;
  font:900 max(13px,calc(var(--w)*.05))/1 var(--font);white-space:nowrap;
  -webkit-text-stroke:clamp(2px,calc(var(--w)*.007),5px) #521129;paint-order:stroke fill;text-shadow:0 .09em #521129;
  box-shadow:inset 0 0 0 max(2px,calc(var(--w)*.0045)) #ffcf50,0 calc(var(--w)*.012) #951442,0 calc(var(--w)*.017) #321034}
.reels-stop::before{content:'';position:absolute;z-index:-1;pointer-events:none;inset:8% 15% auto;height:35%;border-radius:50%;
  background:linear-gradient(#fffdf2d9,#fff6ec20)}
.reels-stop.art{background:center/contain no-repeat;border:none;box-shadow:none;border-radius:50%;filter:drop-shadow(0 calc(var(--w)*.012) 0 #321034)}
.reels-stop.art::before,.reels-stop.art .reels-stop-label{display:none}
.reels-stop.art:active{box-shadow:none;transform:translateY(3px) scale(.97)}
/* телефон вертикально (заказчик): по центру сверху большая СТОП, под ней барабан — всё по центру */
@media (pointer:coarse) and (orientation:portrait){
  .reels{flex-direction:column-reverse;gap:calc(var(--w)*.04)}
  .reels-frame{width:100%;flex:none}
  .reels-stop{width:calc(var(--w)*.36);height:calc(var(--w)*.36)}
}
.reels.show .reels-stop:not(:disabled){pointer-events:auto}
.reels-stop:focus-visible{outline:3px solid #fff;outline-offset:3px}
.reels-stop:active{transform:translateY(3px);box-shadow:inset 0 0 0 2px #ffcf50,0 2px #73122f}
.reels-stop:disabled{filter:grayscale(.4) brightness(.9)}
.reels.show .reels-stop:not(:disabled):not(:active){animation:stopPulse .8s ease-in-out infinite}
.reels-count{position:absolute;top:-12%;right:-12%;width:42%;height:42%;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(#fff392,#ffb221);color:#63270e;border:max(2px,calc(var(--w)*.004)) solid #592543;
  font:900 max(13px,calc(var(--w)*.045))/1 var(--font);-webkit-text-stroke:0;text-shadow:none;box-shadow:inset 0 1px #fffde0,0 2px #8c4317}
.reel.next{box-shadow:0 0 0 max(2px,calc(var(--w)*.006)) #fff699,0 0 calc(var(--w)*.018) #ffd23a}
@keyframes stopPulse{50%{transform:scale(1.055)}}
@media (prefers-reduced-motion:reduce){.reels,.reels.show{transition:none}.reels.show .reels-stop:not(:disabled):not(:active){animation:none}}
`,document.head.appendChild(n)}const fa=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="#2a1250" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${n}</svg>`,ev={tap:fa('<path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5A6.5 6.5 0 0 1 11.5 21h-.6a6 6 0 0 1-4.6-2.2L3.6 15.4a1.5 1.5 0 0 1 2.3-1.9L9 16"/>'),move:fa('<path d="M12 3v18M3 12h18M12 3l-3 3m3-3 3 3M12 21l-3-3m3 3 3-3M3 12l3-3m-3 3 3 3M21 12l-3-3m3 3-3 3"/>'),jump:fa('<path d="M5 15l7-7 7 7"/><path d="M5 20h14"/>'),goal:fa('<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4m8-4h3a3 3 0 0 1-3 4M12 13v4m-4 3h8l-1-3H9z"/>')},ds={move:7,jump:7,goal:3.5};class tv{constructor(e,t){this.h=t,this.step="done",this.t=0,this.seenSpin=!1,nv(),this.el=document.createElement("div"),this.el.className="tut",this.el.setAttribute("role","status"),this.icon=this.el.appendChild(document.createElement("span")),this.icon.className="tut-ico",this.icon.setAttribute("aria-hidden","true"),this.text=this.el.appendChild(document.createElement("span")),e.appendChild(this.el)}get active(){return this.step!=="done"}get current(){return this.step}start(){this.seenSpin=!1,this.go("stop")}stop(){this.go("done")}setVisible(e){this.el.style.visibility=e?"":"hidden"}update(e){if(this.step==="done")return;this.t+=e;const t=this.h;switch(this.step){case"stop":t.reelsSpinning()?this.seenSpin=!0:this.seenSpin&&this.go("move");break;case"move":(t.moved()>2.5||this.t>ds.move)&&this.go("jump");break;case"jump":(t.jumped()||this.t>ds.jump)&&this.go("goal");break;case"goal":this.t>ds.goal&&this.go("done");break}this.step!=="stop"&&t.reelsSpinning()?this.el.classList.remove("show"):this.step!=="done"&&this.el.classList.add("show"),this.dodge()}dodge(){const e=this.h.avoid();if(this.el.style.top=this.el.style.bottom="",!e)return;const t=this.el.getBoundingClientRect();if(t.bottom<=e.top||t.top>=e.bottom)return;const i=this.el.offsetParent?.getBoundingClientRect()??new DOMRect(0,0,innerWidth,innerHeight),s=10;e.bottom+s+t.height<=i.bottom-8?(this.el.style.top=`${e.bottom-i.top+s}px`,this.el.style.bottom="auto"):e.top-s-t.height>=i.top+64&&(this.el.style.top=`${e.top-i.top-s-t.height}px`,this.el.style.bottom="auto")}go(e){const t=this.h,i=t.touch();this.step=e,this.t=0,t.highlightStop(e==="stop"),t.highlightJump(e==="jump"),t.ghostStick(e==="move"&&i);const s={stop:["tap",t.L("Жми СТОП — барабан выберет хаос!","Hit STOP — the reels pick the chaos!")],move:i?["move",t.L("Беги: веди пальцем слева","Run: drag on the left side")]:["move",t.L("Беги: W A S D или стрелки","Run: W A S D or arrow keys")],jump:i?["jump",t.L("Прыгай: кнопка справа","Jump: the button on the right")]:["jump",t.L("Прыгай: ПРОБЕЛ","Jump: SPACE")],goal:["goal",t.L(`Убегай от хаоса ${t.round} секунд!`,`Escape the chaos for ${t.round} seconds!`)]};if(e==="done"){this.el.classList.remove("show");return}const[a,r]=s[e];this.icon.innerHTML=ev[a],this.text.textContent=r,this.el.classList.remove("show","pop"),this.el.offsetWidth,this.el.classList.add("show","pop")}}let Vo=!1;function nv(){if(Vo)return;Vo=!0;const n=document.createElement("style");n.textContent=`
.tut{--tu:min(1vh,1vw,8px);position:absolute;left:0;right:0;margin:0 auto;width:fit-content;bottom:calc(env(safe-area-inset-bottom) + max(96px,24vh));z-index:7;
  display:flex;align-items:center;gap:.5em;max-width:min(64vw,640px);box-sizing:border-box;padding:.5em .95em .5em .6em;border-radius:999px;
  background:linear-gradient(#fffdf4,#ffe9a8);border:3px solid #2a1250;box-shadow:0 5px 0 #2a1250,0 10px 22px #0005;
  color:#2a1250;font:900 clamp(15px,calc(3.1*var(--tu)),26px)/1.15 Nunito,"Arial Black",system-ui,sans-serif;text-align:left;
  pointer-events:none;opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s .25s}
.tut.show{opacity:1;visibility:visible;transition:opacity .25s}
.tut.pop{animation:tutPop .45s cubic-bezier(.2,1.6,.4,1)}
.tut-ico{flex:none;display:grid;place-items:center;width:1.8em;height:1.8em;border-radius:50%;background:#ffd23a;border:2px solid #2a1250}
.tut-ico svg{width:68%;height:68%}
@media (orientation:portrait){.tut{max-width:min(90vw,640px)}}
@media (pointer:fine){.tut{bottom:calc(env(safe-area-inset-bottom) + max(120px,30vh))}}   /* мышь: барабан внизу — подсказка над ним */
@keyframes tutPop{0%{transform:scale(.6)}100%{transform:scale(1)}}
.reels-stop.tut-glow,.jump-btn.tut-glow{animation:tutGlow 1s ease-in-out infinite}
@keyframes tutGlow{0%,100%{filter:drop-shadow(0 0 0 #ffd23a)}50%{filter:drop-shadow(0 0 14px #ffd23a) drop-shadow(0 0 6px #fff);scale:1.08}}
`,document.head.appendChild(n)}const iv={chicken:["Носится по арене и толкается","Runs around and shoves you"],cat:["Гонится и запрыгивает на ящики","Chases you and jumps onto crates"],shark:["Скачет по земле и оставляет лужи","Hops on land and leaves puddles"],banana:["Лежит на месте — не наступай!","Just lies there — don’t step on it!"],meteor:["Падает с неба — беги из красного круга","Falls from the sky — leave the red circle"],bomb:["Шипит, мигает и взрывается","Hisses, blinks and explodes"],snowman:["Бродит по арене, в огне тает","Wanders around, melts in fire"],slime:["Прыгает и оставляет липкую слизь","Bounces and leaves sticky slime"],zombie:["Кусает — и соперник сам становится зомби","Bites — and rivals turn into zombies"],dino:["Гонится рывками, а потом ревёт","Chases in bursts, then roars"],ufo:["Летает и тянет лучом вверх","Flies and pulls you up with a beam"],tornado:["Кружит и раскидывает всех","Spins and throws everyone around"],bee:["Летает на любой высоте — на горе не спрячешься","Flies at any height — hills won’t save you"],boulder:["Катится по прямой через всю арену","Rolls straight across the arena"],frog:["Прыгает даже на вершину башни","Jumps even to the top of the tower"]},av={fire:["Горит и поджигает землю","Burns and sets the ground on fire"],ice:["Морозит землю — будет скользко","Freezes the ground — it gets slippery"],giant:["Огромный и опасный","Huge and dangerous"],bouncy:["Скачет и достаёт повыше","Bounces and reaches higher"],fast:["Быстрый и бьёт током","Fast and zaps with electricity"],plain:["Самый обычный… пока что","Just plain… for now"]};class sv{constructor(e,t){this.L=t,rv(),this.overlay=on("section",e,"chr-overlay enc-overlay"),this.overlay.inert=!0,this.overlay.setAttribute("role","dialog"),this.overlay.setAttribute("aria-modal","true"),this.overlay.setAttribute("aria-label",t("Энциклопедия хаоса","Chaos encyclopedia"));const i=on("header",this.overlay,"chr-header");this.back=on("button",i,"chr-candy chr-back"),this.back.type="button",this.back.textContent="←",this.back.setAttribute("aria-label",t("Назад","Back")),this.back.addEventListener("click",()=>{Ve.play("click",.05),this.onClose?.()}),on("h2",i,"chr-title").textContent=t("ХАОС","CHAOS"),this.counter=on("span",i,"enc-count"),this.grid=on("div",this.overlay,"chr-grid enc-grid"),this.grid.addEventListener("touchmove",s=>s.stopPropagation(),{passive:!0}),document.addEventListener("keydown",s=>{this.open&&s.key!=="Tab"&&s.stopPropagation()},!0)}get open(){return!this.overlay.inert}show(e){const t=new Set(e);this.grid.replaceChildren();let i=0;const s=r=>{on("h3",this.grid,"enc-section").textContent=r};s(this.L("КТО","WHO"));for(const r of Ai){const o=t.has(r);o&&i++;const c=Pa[r];this.card(r,o,this.L(ua(c.ru.one),ua(c.en[0])),this.L(...iv[r]))}s(this.L("КАКОЙ","WHAT KIND"));for(const r of yi){const o=t.has(r);o&&i++;const c=wi[r];this.card(r,o,this.L(ua(c.ru.m),ua(c.en)),this.L(...av[r]))}const a=Ai.length+yi.length;this.counter.textContent=`${i}/${a}`,this.counter.setAttribute("aria-label",this.L(`Открыто ${i} из ${a}`,`${i} of ${a} found`)),this.overlay.inert=!1,this.overlay.classList.add("chr-visible"),this.grid.scrollTop=0,this.back.focus({preventScroll:!0})}hide(){this.overlay.inert=!0,this.overlay.classList.remove("chr-visible")}card(e,t,i,s){const a=on("article",this.grid,`chr-card enc-card${t?" chr-owned enc-open":""}`),r=on("span",a,"chr-portrait enc-pic");r.setAttribute("aria-hidden","true");const o=on("i",r,"enc-icon");o.style.backgroundPosition=jg(e),on("span",a,"chr-name").textContent=t?i:"???",on("span",a,"enc-tip").textContent=t?s:this.L("Ещё не выпадал на барабане","Not rolled yet")}}const ua=n=>n.charAt(0).toUpperCase()+n.slice(1);function on(n,e,t){const i=document.createElement(n);return i.className=t,e.appendChild(i),i}let Wo=!1;function rv(){if(Wo)return;Wo=!0;const n=document.createElement("style");n.textContent=`
.enc-grid { grid-template-columns:repeat(auto-fill,minmax(min(clamp(112px,calc(19 * var(--u)),170px),29vw),1fr)); }
.enc-section { grid-column:1/-1; margin:4px 0 0; justify-self:start; padding:.15em .6em; border-radius:999px;
  background:#ffd23a; color:var(--ink); font-size:clamp(14px,calc(2.8 * var(--u)),22px); -webkit-text-stroke:0; }
.enc-card { cursor:default; }
.enc-icon { display:block; width:82%; aspect-ratio:1; background:url(./assets/reel.webp?v=mwpzjthk) 0 0/400% 600% no-repeat; }
.enc-card:not(.enc-open) .enc-icon { filter:brightness(0) opacity(.45); }
.enc-card:not(.enc-open) .chr-portrait > * { filter:brightness(0) opacity(.45); }
.enc-tip { font-size:clamp(12px,calc(1.9 * var(--u)),16px); font-weight:800; line-height:1.15; text-align:center; color:#4a3477; padding:0 4px 2px; }
.enc-card:not(.enc-open) .enc-tip { color:#7c6ba0; }
.enc-count { justify-self:end; padding:.2em .7em; border:2px solid var(--ink); border-radius:999px;
  background:linear-gradient(#fff4a4,#ffad26); color:#552409; -webkit-text-stroke:0; font-size:clamp(15px,calc(3 * var(--u)),24px); }
`,document.head.appendChild(n)}const ov=["Kirill_2014","pro_nastya","DimkaYT","SuperMax777","Lizka_kitty","Noob_Master","TimurPlay","sonya.bloxy","Artem_GG","xX_Egor_Xx","Vika_cute","MegaBuilder"],cv=["Kirill","Nastya","Dimka","Max","Liza","Timur","Sonya","Artem","Egor","Vika","Misha","Polina","Danya","Sasha","Katya","Vanya","Alisa","Matvey","Arina","Lev","Mila","Gleb","Yana","Roma","Dasha","Fedya","Kira","Sema","Ulya","Nikita","Tema","Lera","Ilya","Vera","Mark","Eva","Zhenya","Tasya","Bogdan","Masha"],Xo=["Shadow","Ninja","Pixel","Blox","Turbo","Lucky","Crazy","Speedy","Gamer","Builder","Cookie","Panda","Foxy","Bunny","Dragon","Rocket","Storm","Frosty","Sunny","Zombie","Kitty","Banana","Taco","Noob","Boss","Legend","Cheese","Mango"],ei=n=>n[Math.floor(Math.random()*n.length)],ha=()=>ei(["",String(Math.floor(Math.random()*99)+1),String(2008+Math.floor(Math.random()*11)),"777","228","1337","_"+(Math.floor(Math.random()*9)+1)]);function wa(){const n=ei(cv),e=ei(Xo),t=Math.random();return(t<.12?ei(ov):t<.3?`${n}_${e}${ha()}`:t<.45?`${e}${ei(Xo)}${ha()}`:t<.55?`xX_${n}_Xx`:t<.65?`${n.toLowerCase()}.${e.toLowerCase()}`:t<.75?`pro_${n.toLowerCase()}${ha()}`:t<.85?`${n}${ei(["YT","Play","_GG","TV","Top","_cool"])}`:`${n}${ha()||"_"+(Math.floor(Math.random()*90)+10)}`).slice(0,16)}const fi=.2,pa=2.3,lv=.4,Ko=2.05,dv=.5,fv=.3;class uv{constructor(e,t,i,s,a){this.alive=!0,this.gone=!1,this.think=Math.random()*fi,this.dir=new he(0,0,1),this.moving=!1,this.jump=!1,this.burnT=0,this.panicT=0,this.skill=.35+Math.random()*.55,this.noticeT=0,this.wx=0,this.wz=0,this.wanderT=0,this.idleT=0,this.hoppy=.06+Math.random()*.14,this.rv=new he,this.spin=new he,this.lying=!1,this.avatar=new La(Ls[(i+1)%Ls.length].look,!0),e.add(this.avatar.root),this.ctl=new ol(this.avatar,(r,o,c)=>t.move(r,o,c)),this.tag=pv(s),this.avatar.root.add(this.tag),this.ctl.onJump=()=>a.puff?.(this.ctl.pos.x,this.ctl.pos.y,this.ctl.pos.z,.35),this.ctl.onLand=r=>{r>7&&a.puff?.(this.ctl.pos.x,this.ctl.pos.y,this.ctl.pos.z,Math.min(1,r/16))}}reset(e,t){this.alive=!0,this.gone=!1,this.lying=!1,this.burnT=0,this.panicT=0,this.noticeT=0,this.moving=!1,this.skill=.35+Math.random()*.55,this.hoppy=.06+Math.random()*.14,this.wanderT=0,this.idleT=0;const i=this.avatar.root;i.visible=!0,i.rotation.set(0,0,0),this.tag.material.opacity=1,this.ctl.setSpawn(new he(e,.01,t),Math.atan2(-e,-t)),this.ctl.respawn(),this.ctl.grip=1,this.ctl.speedMul=1}setNick(e){const t=this.tag.material,i=t.map;t.map=gl(e),t.needsUpdate=!0,i?.dispose()}get pos(){return this.alive?this.ctl.pos:this.avatar.root.position}kill(e,t,i){if(!this.alive)return;this.alive=!1;const s=Math.hypot(e,t)||1;this.rv.set(e/s*5*i,7+5*i,t/s*5*i),this.spin.set((Math.random()-.5)*14,(Math.random()-.5)*8,(Math.random()-.5)*14),this.tag.material.opacity=.35}vanish(){this.alive=!1,this.gone=!0,this.avatar.root.visible=!1}update(e,t){if(this.gone)return;if(!this.alive){this.fly(e,t);return}this.think-=e,this.think<=0&&(this.think=fi,this.plan(t));const i=this.ctl.pos,a=this.ctl.grounded&&i.y<Ds?t.cell(i.x,i.z):ut.None;if(this.ctl.grip=a===ut.Ice?.08:1,this.ctl.speedMul=a===ut.Slime?.45:1,this.burnT=a===ut.Fire||a===ut.Shock?this.burnT+e:0,this.burnT>lv){this.kill(Math.random()-.5,Math.random()-.5,.6),t.died?.(i.x,i.y,i.z);return}this.ctl.update(e,{x:0,y:this.moving?1:0},this.jump,this.dir),this.jump=!1,t.lava()>i.y+.1&&(this.vanish(),t.died?.(i.x,i.y,i.z))}plan(e){const t=this.ctl.pos,i=e.time();let s=0,a=0,r=0,o=!1;for(const f of e.mobs()){if(!f.live)continue;const E=f.phase==="fall",y=E?f.tx:f.x,_=E?f.tz:f.z;let R=t.x-y,T=t.z-_;R*R+T*T<.001&&(R=.1,T=.07);const I=R*R+T*T,x=E?4.5:f.kind==="tornado"?9:f.kind==="ufo"?6:8;if(I>x*x||!E&&f.kind!=="tornado"&&f.kind!=="ufo"&&t.y>Ko&&f.y<t.y-1)continue;const w=(E?2:i>44?.3:1)/I;s+=R*w,a+=T*w,r+=w,!E&&I<49&&(o=!0)}r>.02?this.noticeT+=fi:this.noticeT=0;const c=this.noticeT>=(1-this.skill)*.8;c||(s=0,a=0);for(const[f,E]of[[2,0],[-2,0],[0,2],[0,-2]]){const y=e.cell(t.x+f,t.z+E);(y===ut.Fire||y===ut.Shock)&&(s-=f*.12,a-=E*.12)}const l=25;t.x>l&&(s-=.4),t.x<-l&&(s+=.4),t.z>l&&(a-=.4),t.z<-l&&(a+=.4);const d=i>53?2.6:i>47?1.6:i>40?.6:0,h=Math.max(d,o&&c?Ko+.1:0),u=e.heightAt(t.x,t.z);if(h>0&&u<h-.1){const f=this.climbTarget(e,t,h);if(f){const E=f.x-t.x,y=f.z-t.z,_=Math.hypot(E,y)||1,R=d>0?1.2:.6;s+=E/_*R*Math.max(.3,r*4+.3),a+=y/_*R*Math.max(.3,r*4+.3)}}else if(h>0){const f=e.spots().find(E=>Math.abs(t.x-E.x)<E.sx&&Math.abs(t.z-E.z)<E.sz&&Math.abs(E.h-u)<.2);f&&(s=s*.25+(f.x-t.x)*.15,a=a*.25+(f.z-t.z)*.15)}else if(r===0){if(this.wanderT-=fi,this.idleT>0){this.idleT-=fi,this.moving=!1;return}(this.wanderT<=0||Math.hypot(this.wx-t.x,this.wz-t.z)<1.2)&&this.pickWander(e,t);const f=this.wx-t.x,E=this.wz-t.z,y=Math.hypot(f,E)||1;s=f/y,a=E/y}if(this.panicT>0?this.panicT-=fi:c&&r>.05&&Math.random()<(1-this.skill)*.08&&(this.panicT=.8+Math.random()),this.panicT>0){const f=Math.atan2(a,s)+(Math.random()-.5)*3;s=Math.cos(f),a=Math.sin(f)}const v=Math.hypot(s,a);if(this.moving=v>.03,this.moving&&this.dir.set(s/v,0,a/v),this.moving&&h>0&&u>=h-.1){const f=t.x+this.dir.x*1.1,E=t.z+this.dir.z*1.1;e.heightAt(f,E)<Math.min(u,h)-.2&&(this.moving=!1)}const b=t.x+this.dir.x*1.3,S=t.z+this.dir.z*1.3,g=e.heightAt(b,S);if(this.moving&&g>t.y+.3&&g<=t.y+pa&&this.ctl.grounded&&(this.jump=!0),this.moving&&this.ctl.grounded&&!this.jump){for(const f of e.mobs()){if(!f.live||f.phase==="fall"||f.kind==="tornado"||f.kind==="ufo"||Math.abs(f.y-t.y)>1.5)continue;const E=f.x-t.x,y=f.z-t.z,_=Math.hypot(E,y);if(_<2.6&&(E*this.dir.x+y*this.dir.z)/(_||1)>.5){this.jump=!0;break}}!this.jump&&Math.random()<this.hoppy*(r>0?1.6:1)&&(this.jump=!0)}}pickWander(e,t){this.wanderT=2+Math.random()*3.5,Math.random()<.12&&(this.idleT=.4+Math.random()*1.2);const i=e.player?.(),s=Math.random();if(i&&s<.3){const o=Math.random()*6.28,c=1.5+Math.random()*4;this.wx=i.x+Math.cos(o)*c,this.wz=i.z+Math.sin(o)*c;return}if(s<.55){const o=e.heightAt(t.x,t.z),c=e.spots().filter(l=>l.h>o+.3&&l.h<=o+pa&&Math.max(l.sx,l.sz)>=.9&&Math.hypot(l.x-t.x,l.z-t.z)<18);if(c.length){const l=ei(c);this.wx=l.x,this.wz=l.z;return}}const a=Math.random()*6.28,r=4+Math.random()*12;this.wx=Wt.clamp(t.x+Math.cos(a)*r,-21,21),this.wz=Wt.clamp(t.z+Math.sin(a)*r,-21,21)}climbTarget(e,t,i){const s=e.spots();let a=null,r=1/0;for(const d of s){if(d.h<i||Math.max(d.sx,d.sz)<.9)continue;const h=Math.hypot(d.x-t.x,d.z-t.z)+(d.h-i)*1.5;h<r&&(r=h,a=d)}if(!a)return null;const o=e.heightAt(t.x,t.z);if(a.h-o<=pa)return a;let c=null,l=1/0;for(const d of s){if(d.h<=o+.3||d.h>o+pa)continue;const h=Math.hypot(d.x-a.x,d.z-a.z)+Math.hypot(d.x-t.x,d.z-t.z)*.5;h<l&&(l=h,c=d)}return c??a}fly(e,t){const i=this.avatar.root;if(this.lying){t.lava()>i.position.y-.2&&(i.visible=!1),this.avatar.limp(e,0);return}this.rv.y-=30*e,i.position.addScaledVector(this.rv,e),i.rotation.x+=this.spin.x*e,i.rotation.y+=this.spin.y*e,i.rotation.z+=this.spin.z*e;const s=t.heightAt(i.position.x,i.position.z)+.3;i.position.y<s&&this.rv.y<0&&(i.position.y=s,this.rv.y=-this.rv.y*.35,this.rv.x*=.55,this.rv.z*=.55,this.spin.multiplyScalar(.5),Math.abs(this.rv.y)<1.5&&(this.lying=!0,i.rotation.set(-Math.PI/2,i.rotation.y,0),i.position.y=s-.05)),this.avatar.limp(e,Math.min(1,this.rv.length()/8))}}class hv{constructor(e,t,i,s){this.physics=t,this.h=s,this.list=[],this.step=new he;for(let a=0;a<i;a++)this.list.push(new uv(e,t,a,wa(),s))}reset(e){const t=new Set;this.list.forEach((i,s)=>{let a=wa();for(let r=0;r<10&&t.has(a);r++)a=wa();t.add(a),i.setNick(a),i.reset(...e[s%e.length])})}update(e,t=null,i){for(const s of this.list)s.update(e,this.h);if(this.shove(t,e),i)for(const s of this.list){if(s.gone)continue;const a=s.pos,r=Math.hypot(a.x-i.x,a.y+1.2-i.y,a.z-i.z);s.avatar.root.visible=r>3.2&&this.h.lava()<=a.y-.2;const o=Math.min(1,r/9);s.tag.scale.set(2.4*o,.6*o,1)}}shove(e,t){const i=[];e&&i.push({c:e,share:fv});for(const r of this.list)r.alive&&i.push({c:r.ctl,share:1});const s=dv*2,a=Math.min(1,t*60)*1.2;for(let r=0;r<i.length;r++)for(let o=r+1;o<i.length;o++){const c=i[r],l=i[o];if(Math.abs(c.c.pos.y-l.c.pos.y)>1.6)continue;const d=l.c.pos.x-c.c.pos.x,h=l.c.pos.z-c.c.pos.z,u=Math.hypot(d,h);if(u>=s)continue;const v=u>1e-4?d/u:Math.random()-.5,b=u>1e-4?h/u:Math.random()-.5,S=s-u,g=c.share+l.share;this.push(c.c,-v,-b,S*c.share/g,a*c.share/g*2),this.push(l.c,v,b,S*l.share/g,a*l.share/g*2)}}push(e,t,i,s,a){this.step.set(t*s,0,i*s),this.physics.move(e.pos,this.step,1),e.vel.x+=t*a,e.vel.z+=i*a}get alive(){return this.list.filter(e=>e.alive).length}hit(e,t,i,s,a,r=1){const o=[];for(const c of this.list){if(!c.alive)continue;const l=c.pos;(l.x-e)**2+(l.z-i)**2>=s*s||Math.abs(l.y-t)>=2.2||(a?(c.vanish(),o.push([l.x,l.z])):(c.kill(l.x-e,l.z-i,r),this.h.died?.(l.x,l.y,l.z)))}return o}}function pv(n){const e=new cf(new lf({map:gl(n),depthTest:!1,transparent:!0}));return e.scale.set(2.4,.6,1),e.position.y=3.8,e.renderOrder=10,e}function gl(n){const e=document.createElement("canvas");e.width=256,e.height=64;const t=e.getContext("2d"),i=Math.min(34,8024/Math.max(1,(t.font="bold 34px Arial, sans-serif",t.measureText(n).width)));t.font=`bold ${i}px Arial, sans-serif`,t.textAlign="center",t.textBaseline="middle",t.lineJoin="round",t.miterLimit=2,t.lineWidth=7,t.strokeStyle="rgba(0,0,0,.65)",t.strokeText(n,128,34),t.fillStyle="#ffffff",t.fillText(n,128,34);const s=new pn(e);return s.colorSpace=Ht,s}class mv{constructor(e,t,i){this.L=t,this.src=i,this.ticket=0,_v(),this.overlay=jt("section",e,"chr-overlay lb-overlay"),this.overlay.inert=!0,this.overlay.setAttribute("role","dialog"),this.overlay.setAttribute("aria-modal","true"),this.overlay.setAttribute("aria-label",t("Рекорды","Leaderboard"));const s=jt("header",this.overlay,"chr-header");this.back=jt("button",s,"chr-candy chr-back"),this.back.type="button",this.back.textContent="←",this.back.setAttribute("aria-label",t("Назад","Back")),this.back.addEventListener("click",()=>{Ve.play("click",.05),this.onClose?.()}),jt("h2",s,"chr-title").textContent=t("РЕКОРДЫ","LEADERBOARD"),jt("span",s,"lb-spacer");const a=jt("div",this.overlay,"lb-body");this.note=jt("p",a,"lb-note"),this.status=jt("p",a,"lb-status"),this.list=jt("ol",a,"lb-list"),this.list.addEventListener("touchmove",r=>r.stopPropagation(),{passive:!0}),this.mine=jt("div",a,"lb-row lb-me lb-mine"),document.addEventListener("keydown",r=>{this.open&&r.key!=="Tab"&&r.stopPropagation()},!0)}get open(){return!this.overlay.inert}show(){this.overlay.inert=!1,this.overlay.classList.add("chr-visible"),this.back.focus({preventScroll:!0}),this.note.hidden=!this.src.demo,this.note.textContent=this.L("Пример таблицы — на площадке здесь будут настоящие игроки","Sample table — real players appear here on the platform"),this.list.replaceChildren(),this.mine.hidden=!0,this.setStatus(this.L("Загружаем…","Loading…"));const e=++this.ticket,t=new Promise((i,s)=>setTimeout(()=>s(new Error("timeout")),8e3));Promise.race([this.src.load(),t]).then(i=>{e!==this.ticket||!this.open||this.render(i)},()=>{e!==this.ticket||!this.open||(this.setStatus(this.L("Не получилось загрузить. Попробуй позже!","Couldn’t load. Try again later!")),this.renderMine(!1))})}hide(){this.ticket++,this.overlay.inert=!0,this.overlay.classList.remove("chr-visible")}setStatus(e){this.status.textContent=e,this.status.hidden=!e}render(e){this.setStatus(e.length?"":this.L("Пока пусто — стань первым!","Nobody here yet — be the first!"));for(const t of e)this.list.append(this.row(t,"li"));this.renderMine(e.some(t=>t.me)),this.list.querySelector(".lb-me")?.scrollIntoView({block:"center"})}renderMine(e){const t=this.src.me();this.mine.hidden=e,!e&&this.mine.replaceChildren(...Array.from(this.row({rank:0,name:t.name,score:t.score,me:!0},"div").children))}row(e,t){const i=document.createElement(t);i.className=`lb-row${e.me?" lb-me":""}${e.rank>=1&&e.rank<=3?` lb-top lb-top${e.rank}`:""}`;const s=jt("span",i,"lb-rank");s.textContent=e.rank>0?String(e.rank):"—";const a=jt("span",i,"lb-ava");a.setAttribute("aria-hidden","true");const r=e.name||this.L("Игрок","Player");if(e.photo){const l=jt("img",a,"lb-photo");l.alt="",l.referrerPolicy="no-referrer",l.src=e.photo,l.addEventListener("error",()=>{l.remove(),a.textContent=jo(r)},{once:!0})}else a.textContent=jo(r);a.style.setProperty("--hue",String(vv(r)%360));const o=jt("span",i,"lb-name");o.textContent=e.me?`${r} (${this.L("ты","you")})`:r;const c=jt("span",i,"lb-score");return c.textContent=e.score.toLocaleString(this.L("ru-RU","en-US")),i.setAttribute("aria-label",`${e.rank>0?e.rank+". ":""}${o.textContent}: ${c.textContent} ${this.L("очков","points")}`),i}}function gv(n){const e=[];let t=3200+Math.floor(Math.random()*600);for(let i=0;i<20;i++)e.push({rank:0,name:wa(),score:t}),t=Math.max(0,t-40-Math.floor(Math.random()*180));return n.score>0&&e.push({rank:0,name:n.name,score:n.score,me:!0}),e.sort((i,s)=>s.score-i.score),e.forEach((i,s)=>{i.rank=s+1}),e}const jo=n=>(n.trim()[0]??"?").toUpperCase(),vv=n=>{let e=0;for(const t of n)e=e*31+t.charCodeAt(0)>>>0;return e};function jt(n,e,t){const i=document.createElement(n);return i.className=t,e.appendChild(i),i}let Yo=!1;function _v(){if(Yo)return;Yo=!0;const n=document.createElement("style");n.textContent=`
.lb-body { width:min(100%,640px); min-height:0; display:flex; flex-direction:column; gap:clamp(6px,calc(1.2 * var(--u)),10px); }
.lb-note { margin:0; align-self:center; padding:.25em .8em; border-radius:999px; background:#ffd23a; color:var(--ink);
  font-size:clamp(12px,calc(2 * var(--u)),16px); -webkit-text-stroke:0; text-align:center; }
.lb-note[hidden],.lb-status[hidden],.lb-mine[hidden] { display:none; }
.lb-status { margin:auto 0; text-align:center; font-size:clamp(15px,calc(3 * var(--u)),24px); -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; }
.lb-list { list-style:none; margin:0; padding:4px 4px 8px; min-height:0; overflow:auto; display:flex; flex-direction:column; gap:clamp(5px,var(--u),8px);
  scrollbar-width:thin; scrollbar-color:#e5b4ff transparent; overscroll-behavior:contain; touch-action:pan-y; }
.lb-row { flex:none; display:grid; grid-template-columns:2.3em 2.2em minmax(0,1fr) auto; align-items:center; gap:.5em;
  min-height:clamp(44px,calc(7 * var(--u)),58px); padding:.25em .8em .25em .4em; color:var(--ink);
  border:var(--line) solid var(--ink); border-radius:clamp(12px,calc(3 * var(--u)),22px);
  background:linear-gradient(#fff9e8,#eae2ff 70%,#d5c4ff); box-shadow:inset 0 0 0 2px #fff9,0 3px #6546a7,0 5px var(--ink); }
.lb-rank { justify-self:center; font-size:1.1em; font-variant-numeric:tabular-nums; }
.lb-top .lb-rank { display:grid; place-items:center; width:1.9em; aspect-ratio:1; border-radius:50%; border:2px solid var(--ink); color:#fff;
  -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; }
.lb-top1 .lb-rank { background:linear-gradient(#fff4a4,#ffc21a 60%,#e8920c); }
.lb-top2 .lb-rank { background:linear-gradient(#ffffff,#cfd8e6 60%,#9aa7bd); }
.lb-top3 .lb-rank { background:linear-gradient(#ffd2a8,#e58a3d 60%,#b85b1c); }
.lb-ava { width:2.1em; aspect-ratio:1; display:grid; place-items:center; overflow:hidden; border-radius:30%; border:2px solid var(--ink);
  background:hsl(var(--hue,260) 75% 62%); color:#fff; -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; }
.lb-photo { width:100%; height:100%; object-fit:cover; }
.lb-name { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.lb-score { font-variant-numeric:tabular-nums; padding:.15em .6em; border-radius:999px; border:2px solid #663214;
  background:linear-gradient(#fff4a4,#ffd345 62%,#ffad26); color:#552409; }
.lb-me { border-color:#793d13; background:linear-gradient(#fffbd7,#ffe599); box-shadow:inset 0 2px #fffdfa,0 3px #be681b,0 0 0 3px #ffdc63; }
.lb-mine { margin:0 4px 2px; }
`,document.head.appendChild(n)}const fn=20,xv=n=>n<=3?n:n<=7?4:5,fs=11,us=n=>Math.sin(n.t*.5+n.seed*7)>-.45,$o=1.3,qo=8,ma=1/0,qn=30,Zo=1,Jo=n=>(n.kind==="cat"?Zo+.05:n.kind==="dino"||n.s>2?1.15:.45)+(n.adj==="bouncy"?Zo:0),hs=.5,bv=3,Mv=["meteor","bomb","banana","snowman"],Sv=["chicken","cat","shark","slime","zombie","dino","ufo","tornado","bee","frog"],Ev={ufo:3,tornado:2,dino:4},Qo=3,Tv=2.2,wv=1.1,yv=4.6,Av=20,ec=1.2,Rv=7.5,tc=1,Cv=10,Lv=7,Pv=7.5,Me=(n,e,t)=>new Dn(n,e,t),ga=n=>new _i(n,12,8),nc={chicken:[[Me(.7,.6,.85),16777215,0,.6,0],[Me(.42,.45,.42),16777215,0,1.05,.35],[Me(.18,.12,.22),16753178,0,1,.65],[Me(.12,.2,.3),15216698,0,1.36,.33],[Me(.08,.08,.02),1118481,-.12,1.12,.57],[Me(.08,.08,.02),1118481,.12,1.12,.57]],cat:[[Me(.55,.5,1),15768122,0,.55,0],[Me(.55,.5,.5),15768122,0,.95,.55],[Me(.14,.2,.1),15768122,-.17,1.28,.5],[Me(.14,.2,.1),15768122,.17,1.28,.5],[Me(.12,.6,.12),13662754,0,.95,-.55],[Me(.4,.3,.9),13662754,0,.15,0],[Me(.1,.1,.02),1710618,-.13,1,.81],[Me(.1,.1,.02),1710618,.13,1,.81]],shark:[[Me(.7,.7,1.7),7311272,0,.5,0],[Me(.6,.25,1.4),15921906,0,.2,.05],[Me(.1,.6,.5),7311272,0,1.1,-.1],[Me(.1,.7,.35),7311272,0,.6,-1],[Me(.5,.06,.06),16777215,0,.36,.86],[Me(.1,.1,.02),1118481,-.3,.65,.6],[Me(.1,.1,.02),1118481,.3,.65,.6]],slime:[[Me(1,.75,1),5625418,0,.4,0],[Me(.8,.2,.8),8382573,0,.86,0],[Me(.16,.22,.02),1118481,-.2,.55,.51],[Me(.16,.22,.02),1118481,.2,.55,.51]],zombie:[[Me(.55,.7,.3),3119776,0,1.25,0],[Me(.5,.5,.5),8115050,0,1.85,0],[Me(.2,.2,.75),8115050,-.38,1.45,.3],[Me(.2,.2,.75),8115050,.38,1.45,.3],[Me(.12,.08,.02),1118481,-.12,1.92,.26],[Me(.12,.08,.02),1118481,.12,1.92,.26],[Me(.24,.06,.02),5904922,0,1.72,.26]],dino:[[Me(.9,.9,1.5),6080842,0,1.25,0],[Me(.75,.6,.85),6080842,0,1.95,.85],[Me(.6,.12,.5),16777215,0,1.68,1.05],[Me(.5,.5,1.1),5221951,0,1.15,-1.1],[Me(.3,.3,.6),5221951,0,1,-1.85],[Me(.6,.35,1),15983272,0,1,.1],[Me(.12,.3,.12),5221951,-.3,1.35,.75],[Me(.12,.3,.12),5221951,.3,1.35,.75],[Me(.12,.12,.02),1118481,-.25,2.1,1.28],[Me(.12,.12,.02),1118481,.25,2.1,1.28]],ufo:[[new xn(1.5,1.7,.35,18),12107980,0,0,0],[new xn(.9,1.5,.25,18),9081763,0,-.28,0],[new _i(.75,14,8,0,Math.PI*2,0,Math.PI/2),9237082,0,.15,0],[Me(.22,.14,.22),16773466,1.35,0,0],[Me(.22,.14,.22),16773466,-.7,0,1.17],[Me(.22,.14,.22),16773466,-.7,0,-1.17]],tornado:[[new xn(.55,.3,.9,10),10136004,0,.45,0],[new xn(.9,.55,.9,10),11780312,.15,1.35,0],[new xn(1.3,.9,.9,10),10136004,-.1,2.25,.1],[new xn(1.8,1.3,.9,10),11780312,.2,3.15,-.1],[new xn(2.2,1.8,.7,10),10136004,0,3.95,0]],bee:[[Me(.5,.42,.6),16765498,0,0,0],[Me(.52,.44,.1),2236966,0,0,.06],[Me(.52,.44,.1),2236966,0,0,-.16],[Me(.36,.34,.24),2763312,0,.02,.4],[Me(.1,.1,.02),16777215,-.1,.07,.53],[Me(.1,.1,.02),16777215,.1,.07,.53],[Me(.42,.04,.28),15398655,-.32,.26,0],[Me(.42,.04,.28),15398655,.32,.26,0],[Me(.08,.08,.18),2763312,0,-.04,-.38]],boulder:[[new Jn(1,1),10130831,0,0,0],[new Jn(.42,0),7828334,.55,.45,.45],[new Jn(.36,0),7828334,-.5,-.3,.6]],frog:[[Me(.8,.5,.9),5227066,0,.35,0],[Me(.7,.2,.7),14283402,0,.18,.06],[Me(.26,.26,.26),5227066,-.24,.68,.28],[Me(.26,.26,.26),5227066,.24,.68,.28],[Me(.12,.12,.02),1118481,-.24,.7,.42],[Me(.12,.12,.02),1118481,.24,.7,.42],[Me(.26,.24,.6),4171055,-.44,.14,-.22],[Me(.26,.24,.6),4171055,.44,.14,-.22],[Me(.14,.3,.14),4171055,-.26,.15,.4],[Me(.14,.3,.14),4171055,.26,.15,.4],[Me(.5,.05,.02),9054762,0,.42,.46]],meteor:[[new Jn(.95,0),6961698,0,0,0],[new Jn(.55,0),16738842,.5,.35,.3]],bomb:[[ga(.7),2500142,0,.7,0],[Me(.3,.2,.3),5592415,0,1.42,0],[Me(.08,.35,.08),13214314,0,1.65,0],[Me(.16,.16,.16),16763955,0,1.86,0]],banana:[[Me(.35,.3,.6),16767034,0,.2,0],[Me(.32,.28,.5),16767034,0,.36,.5],[Me(.32,.28,.5),16767034,0,.36,-.5],[Me(.16,.16,.16),6965794,0,.55,.8],[Me(.16,.16,.16),6965794,0,.55,-.8]],snowman:[[ga(.6),16777215,0,.55,0],[ga(.45),16777215,0,1.35,0],[ga(.33),16777215,0,1.95,0],[Me(.1,.1,.35),16747034,0,1.95,.42],[Me(.08,.08,.02),1118481,-.12,2.05,.31],[Me(.08,.08,.02),1118481,.12,2.05,.31]]},ic={chicken:{part:[Me(.1,.3,.1),16753178,0,-.15,0],x:.18,hip:.3,swing:.7},zombie:{part:[Me(.24,.9,.26),7031342,0,-.45,0],x:.14,hip:.9,swing:.45},dino:{part:[Me(.3,.8,.4),5221951,0,-.4,0],x:.3,hip:.8,swing:.55}},ac=new Qt,sc=new Qt;function rc(n){const e=new Be,t=n.map(([i,s,a,r,o])=>{const c=(i.index?i.toNonIndexed():i.clone()).translate(a,r,o);c.deleteAttribute("uv"),e.setHex(s).convertSRGBToLinear();const l=new Float32Array(c.attributes.position.count*3);for(let d=0;d<l.length;d+=3)l[d]=e.r,l[d+1]=e.g,l[d+2]=e.b;return c.setAttribute("color",new Gt(l,3)),c});return Li(t)}const ui={fire:new Be(1,.42,.12),ice:new Be(.6,.85,1.25),giant:new Be(1,1,1),bouncy:new Be(1,.8,1.1),fast:new Be(1,1,.75),plain:new Be(1,1,1)},Iv={chicken:4,cat:3.8,shark:3.8,slime:3,snowman:2.2,zombie:2.4,dino:4.3,frog:3},Dt=new ea;let hi=0;const oc=new Be(3,3,3),cc=new Be(1.6,.12,.08),va=new Be;class Dv{constructor(e,t,i,s,a,r,o){this.half=t,this.surface=i,this.fx=s,this.flames=a,this.bolts=r,this.h=o,this.mobs=[],this.meshes={},this.legs={},this.waves=[],this.v=new he,this.level={runners:1,speed:1,chase:fs,roam:.65};const c=new en({vertexColors:!0,roughness:.55,flatShading:!0});for(const l of Object.keys(nc)){const d=new an(rc(nc[l]),c,fn);d.setColorAt(0,ui.plain),d.count=0,d.frustumCulled=!1,d.castShadow=!0,e.add(d),this.meshes[l]=d;const h=ic[l];if(h){const u=new an(rc([h.part]),c,fn*2);u.setColorAt(0,ui.plain),u.count=0,u.frustumCulled=!1,u.castShadow=!0,e.add(u),this.legs[l]=u}}this.ring=new an(new Fc(.8,1,28).rotateX(-Math.PI/2),new Xt({color:16722474,transparent:!0,opacity:.8,depthWrite:!1}),fn*3),this.ring.count=0,this.ring.frustumCulled=!1,e.add(this.ring),this.beam=new an(new xn(.45,1,1,18,1,!0).translate(0,-.5,0),new Xt({color:10288986,transparent:!0,opacity:.32,depthWrite:!1,side:ln}),fn),this.beam.count=0,this.beam.frustumCulled=!1,e.add(this.beam)}ufo(e,t){const i=this.h.target(),s=i?i.x:Math.sin(e.seed+e.t*.2)*this.half*.6,a=i?i.z:Math.cos(e.seed+e.t*.2)*this.half*.6,r=s-e.x,o=a-e.z,c=Math.hypot(r,o)||1,l=3.2*(e.adj==="fast"?1.6:1);c>.5&&(e.x+=r/c*l*t,e.z+=o/c*l*t);const d=7.5+(e.adj==="bouncy"?Math.abs(Math.sin(e.t*2))*4:Math.sin(e.t*1.5)*.4)+(e.s-1)*2;e.y+=(d-e.y)*Math.min(1,t*2);const h=(e.t+e.seed)%(Qo+Tv),u=h<Qo&&e.t>1.5,v=1.9*e.s;if(u){hi<fn&&(Dt.position.set(e.x,e.y-.1,e.z),Dt.rotation.set(0,0,0),Dt.scale.set(v,e.y,v),Dt.updateMatrix(),this.beam.setMatrixAt(hi++,Dt.matrix));for(const[b,S]of this.h.hitDummies(e.x,0,e.z,v,!1))this.fx.emit("poof",this.v.set(b,1,S),.6,[10288986]);e.tick<=0&&e.y>0&&(e.tick=hs,this.effect(e,e.x,e.z,!1)),e.tick-=t,i&&(i.x-e.x)**2+(i.z-e.z)**2<v*v&&i.y<e.y?(e.hold+=t,this.h.nudge(0,40*t,0),e.hold>wv&&(e.hold=0,this.h.touchPlayer(e,!0,0,0))):e.hold=Math.max(0,e.hold-t)}else e.hold=0;return!1}tornado(e,t){const i=this.h.target(),s=i&&Math.sin(e.t*.35+e.seed)>-.2,a=s?i.x:Math.sin(e.seed*3+e.t*.15)*this.half*.7,r=s?i.z:Math.cos(e.seed*2+e.t*.15)*this.half*.7,o=a-e.x,c=r-e.z,l=Math.hypot(o,c)||1,d=3.4*(e.adj==="fast"?1.6:1),h=this.half-1;e.x=Wt.clamp(e.x+o/l*d*t,-h,h),e.z=Wt.clamp(e.z+c/l*d*t,-h,h),e.y=e.adj==="bouncy"?Math.abs(Math.sin(e.t*2.5))*2:0,e.yaw=0;const u=this.h.lavaLevel();if(u>0&&(e.y=u),e.tick-=t,e.tick<=0){e.tick=.3;const S=this.surface.at(e.x,e.z),g=Math.random()*6.28,f=2.5*e.s,E=e.x+Math.cos(g)*f,y=e.z+Math.sin(g)*f;S===ut.Fire?this.surface.ignite(E,y,5):S===ut.Ice?this.surface.freezeAt(E,y):S===ut.Wet?this.surface.wetAt(E,y):S===ut.Slime&&this.surface.slimeAt(E,y),S===ut.Fire&&e.adj!=="fire"?(e.adj="fire",this.h.react("fireTornado",e.x,e.z)):S===ut.Ice&&e.adj!=="ice"&&(e.adj="ice",this.h.react("iceTornado",e.x,e.z)),this.effect(e,e.x,e.z,!1),this.fx.emit("dust",this.v.set(e.x,.4,e.z),.5*e.s)}const v=1.1*e.s,b=5*e.s;if(this.h.hitDummies(e.x,0,e.z,v,!1),i){const S=e.x-i.x,g=e.z-i.z,f=Math.hypot(S,g);if(f<b&&i.y<4*e.s){const E=(1-f/b)*22*t;this.h.nudge(S/(f||1)*E-g/(f||1)*E*.6,0,g/(f||1)*E+S/(f||1)*E*.6),f<v&&this.h.touchPlayer(e,!0,0,0)}}return!1}bee(e,t){const i=this.h.target();if(e.t>e.life)return e.y+=6*t,e.t>e.life+1.5?(e.live=!1,!0):!1;const s=e.hold>0;e.hold-=t;let a,r,o;i&&us(e)&&Math.hypot(i.x-e.x,i.z-e.z)<fs*1.5?(a=i.x,r=i.y+1.1,o=i.z):(a=Math.sin(e.seed+e.t*.3)*this.half*.5,r=3,o=Math.cos(e.seed+e.t*.25)*this.half*.5),a+=Math.sin(e.t*2.3+e.seed)*1.2,o+=Math.cos(e.t*1.9+e.seed)*1.2,r+=Math.sin(e.t*3+e.seed)*.4;let c=a-e.x,l=r-e.y,d=o-e.z;s&&(c=-c,d=-d,l=1.5);const h=Math.hypot(c,l,d)||1,u=yv*(e.adj==="fast"?1.4:1)*(e.adj==="giant"?.8:1)*this.level.speed;e.x+=c/h*u*t,e.y+=l/h*u*t,e.z+=d/h*u*t;const v=this.half-1;e.x=Wt.clamp(e.x,-v,v),e.z=Wt.clamp(e.z,-v,v),e.y=Math.max(e.y,Math.max(this.h.heightAt(e.x,e.z),this.h.lavaLevel())+.6*e.s),Math.abs(c)+Math.abs(d)>.05&&(e.yaw=Math.atan2(c,d));const b=.35*e.s+.35;for(const[S,g]of this.h.hitDummies(e.x,e.y-1,e.z,s?0:b,!1))this.fx.emit("poof",this.v.set(S,1,g),.4,[16765498]),e.hold=ec;return i&&!s&&Math.hypot(i.x-e.x,i.z-e.z)<b&&e.y>i.y-.3&&e.y<i.y+2.1&&(this.h.touchPlayer(e,!0,i.x-e.x,i.z-e.z),e.hold=ec),!1}launch(e,t,i){const s=Math.floor(Math.random()*4),a=(Math.random()*2-1)*t*.8,r=this.half-1.2,o=s===0?r:s===1?-r:a,c=s===2?r:s===3?-r:a,l=this.h.target(),d=l&&Math.random()<Math.max(i,.5)?l.x:(Math.random()*2-1)*t*.6,h=l&&Math.random()<Math.max(i,.5)?l.z:(Math.random()*2-1)*t*.6,u=Math.hypot(d-o,h-c)||1;Object.assign(e,{phase:"roll",x:o,z:c,y:this.h.heightAt(o,c),ground:this.h.heightAt(o,c),dx:(d-o)/u,dz:(h-c)/u,roll:0}),e.yaw=Math.atan2(e.dx,e.dz),this.fx.emit("dust",this.v.set(o,.5,c),1.2*e.s)}rollStep(e,t,i){const s=e.s;if(e.t<tc){e.x+=Math.sin(e.t*60)*.03;for(let v=0;v<4;v++)this.setRing(i+v,e.x+e.dx*(3+v*3),0,e.z+e.dz*(3+v*3),s*(.9+.1*Math.sin(e.t*12+v)));return!1}const a=Rv*(e.adj==="fast"?1.5:1)*(e.adj==="giant"?.8:1)*this.level.speed,r=e.x+e.dx*a*t,o=e.z+e.dz*a*t;if(this.h.heightAt(r+e.dx*s*.8,o+e.dz*s*.8)>e.y+.6*s&&e.y<=e.ground+.2)return e.live=!1,this.fx.emit("dust",this.v.set(e.x,e.y+s,e.z),1.6*s),this.fx.emit("poof",this.v.set(e.x,e.y+s,e.z),1.1*s,[10130831,7828334,14078148]),this.h.land?.(e.x,e.y,e.z,2*s),this.h.hitDummies(e.x,e.y,e.z,s+.8,!1),!0;e.x=r,e.z=o,e.roll+=a*t/s;const d=Math.abs(e.x)>this.half+.5||Math.abs(e.z)>this.half+.5?-50:this.h.heightAt(e.x,e.z);if(e.ground=d<=e.y+.6*s?d:e.ground,e.vy-=qn*t,e.y+=e.vy*t,e.y<=e.ground&&(e.vy<-9&&this.h.land?.(e.x,e.ground,e.z,e.s),e.y=e.ground,e.vy=e.adj==="bouncy"?9:0),e.y<-12)return e.live=!1,!0;const h=this.h.lavaLevel();if(e.y<h-.3)return e.live=!1,this.fx.emit("lava",this.v.set(e.x,h+.3,e.z),.8),!0;e.tick-=t,e.tick<=0&&e.y<.5&&(e.tick=hs*.6,this.effect(e,e.x,e.z,!1)),this.h.hitDummies(e.x,e.y,e.z,s+.3,!1);for(const v of this.mobs)!v.live||v.phase!=="run"||Math.hypot(v.x-e.x,v.z-e.z)>s+.5||Math.abs(v.y-e.y)>2*s||(v.kx+=e.dx*12,v.kz+=e.dz*12,v.vy=Math.max(v.vy,6));const u=this.h.target();if(u){const v=u.x-e.x,b=u.z-e.z;v*v+b*b<(s+.35)**2&&u.y<e.y+2*s&&u.y+1.6>e.y&&this.h.touchPlayer(e,!0,v,b)}return!1}frog(e,t){if(e.stun>0){e.stun-=t;return}if(e.y<=e.ground+.01&&e.vy<=0){e.vx=e.vz=0,e.hold+=t;const o=e.adj==="fast"?.6:e.adj==="bouncy"?.5:1.2;if(e.hold<o)return;e.hold=0;const c=this.h.target(),l=c&&us(e)&&Math.hypot(c.x-e.x,c.z-e.z)<fs,d=(Math.random()-.5)*3,h=(Math.random()-.5)*3,u=l?c.x+d:Math.sin(e.seed+e.t*.3)*this.half*.55,v=l?c.z+h:Math.cos(e.seed+e.t*.3)*this.half*.55;let b=u-e.x,S=v-e.z;const g=Math.hypot(b,S)||1,f=Math.min(g,Lv*(e.adj==="giant"?1.3:1));b/=g,S/=g;const E=this.h.heightAt(e.x+b*f,e.z+S*f);let y=E;for(let I=1;I<=6;I++)y=Math.max(y,this.h.heightAt(e.x+b*f*I/6,e.z+S*f*I/6));const _=Wt.clamp(y-e.y+1.6,1.5,Pv);e.vy=Math.sqrt(2*qn*_);const R=e.vy/qn+Math.sqrt(Math.max(.01,2*(e.y+_-E)/qn)),T=f/R;e.vx=b*T,e.vz=S*T,e.yaw=Math.atan2(b,S);return}const s=e.x+e.vx*t,a=e.z+e.vz*t,r=this.half-.8;if(Math.abs(s)>=r||Math.abs(a)>=r){e.vx=e.vz=0;return}this.h.heightAt(s,a)<=e.y+.05?(e.x=s,e.z=a):e.vy<=0&&(e.vx=e.vz=0)}has(e){return this.waves.some(t=>t.r.adj===e)||this.mobs.some(t=>t.live&&t.adj===e)}start(e,t=.25){const i=Sv.includes(e.noun);let s=i?Math.min(Ev[e.noun]??99,Math.max(1,Math.round(xv(e.n)*this.level.runners))):Math.min(e.noun==="boulder"?Cv:30,e.n),a=1;e.adj==="giant"&&(s=Math.min(i?3:6,Math.max(1,Math.ceil(s/3))),a=2.2),e.n===1&&(a*=1.7),this.waves.push({r:e,left:s,gap:Math.min(.7,(i?4:qo)/s),next:0,s:a,t:0,aim:t})}reset(){this.waves.length=0;for(const e of this.mobs)e.live=!1;for(const e in this.meshes)this.meshes[e].count=0;for(const e in this.legs)this.legs[e].count=0;this.ring.count=0}alive(e){let t=0;for(const i of this.mobs)i.live&&i.kind===e&&t++;return t}spawn(e,t,i){if(this.alive(e.noun)>=fn)return;const s=this.mobs.find(r=>!r.live)??(this.mobs.push({}),this.mobs[this.mobs.length-1]),a=this.half-1.5;if(Object.assign(s,{kind:e.noun,adj:e.adj,live:!0,s:t,t:0,vy:0,bounces:0,tick:0,seed:Math.random()*100,life:ma,yaw:Math.random()*6.28,steer:0,steerT:0,hold:0,vx:0,vz:0,kx:0,kz:0,stun:0,roll:0,dx:0,dz:1,gait:0}),e.noun==="boulder"){this.launch(s,a,i);return}if(Mv.includes(e.noun)){const r=this.h.target();let o,c;if(r&&Math.random()<(this.h.perched?.()?Math.max(i,.7):i)){const l=this.h.targetVel();o=r.x+l.x*.7,c=r.z+l.z*.7}else o=(Math.random()*2-1)*a,c=(Math.random()*2-1)*a;this.aim(s,Wt.clamp(o,-a,a),Wt.clamp(c,-a,a),e.adj==="fast"?$o*.8:$o)}else{const[r,o]=this.nearPlayer(e.noun==="ufo"||e.noun==="tornado"?14:10,a);e.noun==="ufo"?Object.assign(s,{phase:"fly",x:r,z:o,y:16,ground:0}):e.noun==="bee"?Object.assign(s,{phase:"buzz",x:r,z:o,y:9,ground:0,life:Av}):e.noun==="tornado"?(Object.assign(s,{phase:"wind",x:r,z:o,y:0,ground:0}),this.fx.emit("dust",this.v.set(r,.5,o),1.5)):Object.assign(s,{phase:"drop",x:r,z:o,y:9,ground:this.h.impactAt(r,o)})}}nearPlayer(e,t){const i=this.h.target();let s=0,a=0;for(let r=0;r<8;r++){const o=Math.random()*Math.PI*2,c=e+Math.random()*5;if(s=Wt.clamp((i?.x??0)+Math.cos(o)*c,-t,t),a=Wt.clamp((i?.z??0)+Math.sin(o)*c,-t,t),this.h.heightAt(s,a)===0&&this.h.heightAt(s+1,a+1)===0&&this.h.heightAt(s-1,a-1)===0)break}return[s,a]}spawnAt(e,t,i,s){if(this.alive(e.noun)>=fn)return;const a=this.mobs.find(r=>!r.live)??(this.mobs.push({}),this.mobs[this.mobs.length-1]);Object.assign(a,{kind:e.noun,adj:e.adj,live:!0,s,t:0,vy:4,bounces:0,tick:0,seed:Math.random()*100,life:ma,yaw:Math.random()*6.28,steer:0,steerT:0,hold:0,vx:0,vz:0,kx:0,kz:0,stun:0,roll:0,dx:0,dz:1,gait:0,phase:"run",x:t,z:i,y:0,ground:this.h.heightAt(t,i)}),this.fx.emit("poof",this.v.set(t,1,i),.8,[8115050,4165434])}separate(){const e=this.mobs;for(let t=0;t<e.length;t++){const i=e[t];if(!(!i.live||i.phase!=="run"))for(let s=t+1;s<e.length;s++){const a=e[s];if(!a.live||a.phase!=="run")continue;const r=a.x-i.x,o=a.z-i.z,c=r*r+o*o,l=this.body(i)+this.body(a);if(c>=l*l)continue;const d=Math.sqrt(c)||.001,h=(t*2.4+s)%6.28,u=c<1e-6?Math.cos(h):r/d,v=c<1e-6?Math.sin(h):o/d,b=(l-d)*.5,S=this.free(i.x-u*b,i.z-v*b,i.y,this.body(i),this.step(i)),g=this.free(a.x+u*b*(S?1:2),a.z+v*b*(S?1:2),a.y,this.body(a),this.step(a));S&&(i.x-=u*b*(g?1:2),i.z-=v*b*(g?1:2)),g&&(a.x+=u*b*(S?1:2),a.z+=v*b*(S?1:2))}}}aim(e,t,i,s){Object.assign(e,{phase:"fall",tx:t,tz:i,x:t,z:i,t:0,warn:s,ground:this.h.impactAt(t,i),from:34})}reach(e){return(e.kind==="shark"?.6:e.kind==="dino"?.75:.45)*e.s+.25}body(e){return(e.kind==="shark"?.55:e.kind==="dino"?.6:.45)*Math.min(e.s,1.6)}step(e){return e.kind==="dino"||e.s>2?1.1:.45}effect(e,t,i,s){if(e.adj==="fast"&&this.surface.at(t,i)===ut.Wet&&this.surface.shockAt(t,i),e.adj!=="fire"&&e.adj!=="ice"){if(e.kind==="shark"){this.surface.wetAt(t,i);return}if(e.kind==="slime"){this.surface.slimeAt(t,i);return}}if(e.adj!=="fire"&&e.adj!=="ice"&&e.kind!=="meteor"&&e.kind!=="snowman")return;const a=e.adj==="ice"||e.kind==="snowman"&&e.adj!=="fire",r=s?[[0,0],[2,0],[-2,0],[0,2],[0,-2]]:[[0,0]],o=s?Math.max(1,e.s*.7):1;for(const[c,l]of r)a?this.surface.freezeAt(t+c*o,i+l*o):this.surface.ignite(t+c*o,i+l*o,s?7:bv)}land(e){const t=this.reach(e)+.6*e.s;switch(e.kind){case"meteor":if(this.explode(e.x,e.ground,e.z,2.1*e.s,e),e.ground<.5&&this.effect(e,e.x,e.z,!0),e.adj==="bouncy"&&e.bounces<2){e.bounces++;const i=Math.random()*6.28,s=this.half-1.5;this.aim(e,Wt.clamp(e.x+Math.cos(i)*6,-s,s),Wt.clamp(e.z+Math.sin(i)*6,-s,s),.8),e.from=e.ground+7}else e.live=!1;return;case"bomb":this.explode(e.x,e.ground,e.z,t,{kind:"bomb",adj:"plain"}),Object.assign(e,{phase:"fuse",t:0,y:e.ground,warn:e.adj==="fast"?.8:1.6});return;case"banana":Object.assign(e,{phase:"lie",t:0,y:e.ground,life:ma}),this.fx.emit("dust",this.v.set(e.x,e.ground+.2,e.z),.8),this.effect(e,e.x,e.z,!1);return;default:this.explode(e.x,e.ground,e.z,t,e),this.effect(e,e.x,e.z,!0),Object.assign(e,{phase:"run",t:0,y:e.ground,life:ma})}}free(e,t,i,s,a=.45,r=1/0,o=-1/0){const c=this.half-.6-s,l=Math.max(Math.min(i+a,r),o),d=this.h.heightAt;return Math.abs(e)<c&&Math.abs(t)<c&&d(e,t)<=l&&d(e-s,t-s)<=l&&d(e+s,t-s)<=l&&d(e-s,t+s)<=l&&d(e+s,t+s)<=l}run(e,t){if(e.stun>0){e.stun-=t,e.vx=e.vz=0,e.yaw+=Math.sin(e.t*60)*.15;return}if(e.kind==="dino"&&(e.t+e.seed)%7>5){e.vx=e.vz=0;const B=this.h.target();if(B){let te=Math.atan2(B.x-e.x,B.z-e.z)-e.yaw;te=Math.atan2(Math.sin(te),Math.cos(te)),e.yaw+=te*Math.min(1,t*4)}return}const i=this.h.target(),s=i&&us(e)&&Math.hypot(i.x-e.x,i.z-e.z)<this.level.chase?i:null;let a,r;if(s)a=s.x-e.x,r=s.z-e.z;else{const B=i?i.x*this.level.roam:0,te=i?i.z*this.level.roam:0,$=this.half*.38;a=B+Math.sin(e.seed+e.t*.25)*$-e.x,r=te+Math.cos(e.seed*1.7+e.t*.2)*$-e.z}const o=Math.hypot(a,r)||1,l=Math.sin(e.t*1.3+e.seed)*.6+(e.steerT>0?e.steer:0);e.steerT-=t;const d=a/o,h=r/o,u=d*Math.cos(l)-h*Math.sin(l),v=d*Math.sin(l)+h*Math.cos(l);let b=this.level.speed*(Iv[e.kind]??4)*(e.adj==="fast"?1.4:1)*(e.adj==="giant"?.75:1);(e.kind==="slime"||e.kind==="shark")&&(b*=e.y>e.ground+.05?1:.25);const S=e.y<.5?this.surface.at(e.x,e.z):ut.None;S===ut.Slime&&e.kind!=="slime"&&(b*=.45);const g=S===ut.Ice&&e.kind!=="snowman"?Math.min(1,t*1.1):1;g<1&&Math.hypot(e.vx,e.vz)>2.5&&this.h.react("skate",e.x,e.z),e.vx+=(u*b*(g<1?1.3:1)-e.vx)*g,e.vz+=(v*b*(g<1?1.3:1)-e.vz)*g;const f=e.x+e.vx*t,E=e.z+e.vz*t,y=e.y<=e.ground+.01,_=this.body(e),R=this.step(e),T=Jo(e);let I=!0;const x=e.ground+.05;this.free(f,E,e.y,_,R,T,x)?(e.x=f,e.z=E):this.free(f,e.z,e.y,_,R,T,x)?e.x=f:this.free(e.x,E,e.y,_,R,T,x)?e.z=E:(I=!1,e.vx=e.vz=0);const w=(e.kind==="cat"||e.adj==="bouncy")&&e.s<2,N=this.h.heightAt(e.x+u*(_+.7),e.z+v*(_+.7)),O=N>e.y+.3&&N<=T?Math.min(12.5,Math.sqrt(2*qn*(N-e.y+.6))):0;if(w&&y&&O&&s&&s.y>e.y+.6&&o<7&&!this.free(f,E,e.y,_,R)&&(e.vy=O),e.hold=I?Math.max(0,e.hold-t):e.hold+t,e.hold>1.5&&y){e.hold=0;e:for(let B=.8;B<=5;B+=.7)for(let te=0;te<12;te++){const $=e.x+Math.cos(te*.524+e.seed)*B,V=e.z+Math.sin(te*.524+e.seed)*B;if(this.h.heightAt($,V)<=T&&this.free($,V,this.h.heightAt($,V),_,R)){e.x=$,e.z=V,e.ground=e.y=this.h.heightAt($,V),this.fx.emit("poof",this.v.set($,e.y+.5,V),.5*e.s);break e}}}if(!I){y&&w&&O&&(e.vy=O);const B=e.steerT>0?Math.sign(e.steer):e.seed%2<1?1:-1;e.steer=B*Math.min(2.6,e.steerT>0?Math.abs(e.steer)+.5:1.6),e.steerT=1.4}if(I){let te=Math.atan2(u,v)-e.yaw;te=Math.atan2(Math.sin(te),Math.cos(te)),e.yaw+=te*Math.min(1,t*10)}y&&(e.adj==="bouncy"?e.vy=10:e.kind==="slime"?e.vy=7:e.kind==="shark"&&(e.vy=5.5))}update(e){for(const a of this.waves)for(a.t+=e,a.next-=e;a.left>0&&a.next<=0;)this.spawn(a.r,a.s,a.left<=3&&a.r.n<=3?1:a.aim),a.left--,a.next+=a.gap;this.waves=this.waves.filter(a=>a.left>0&&a.t<qo+2),this.separate();const t=this.h.lavaLevel(),i={};for(const a in this.meshes)i[a]=0;let s=0;hi=0;for(const a of this.mobs){if(!a.live)continue;a.t+=e;let r=0,o=1,c=a.stun>0&&Math.sin(a.t*50)>0,l=-1;if(a.phase==="fall"){const g=Math.min(1,a.t/a.warn);if(a.y=a.ground+(a.from-a.ground)*(1-g*g),a.x=a.tx+(1-g)*5,a.z=a.tz,r=a.t*5,this.setRing(s++,a.tx,a.ground,a.tz,(a.kind==="meteor"?2.1:this.reach(a)+.6)*a.s*(.5+.5*g)),g>=1&&(a.x=a.tx,this.land(a),!a.live))continue}else if(a.phase==="drop")a.vy-=qn*e,a.y+=a.vy*e,a.y<=a.ground&&(a.y=a.ground,a.vy=0,a.phase="run",a.t=0,this.fx.emit("poof",this.v.set(a.x,a.y+.5,a.z),.6*a.s));else if(a.phase==="fuse"){if(a.adj==="bouncy"&&this.run(a,e),c=Math.sin(a.t*(8+a.t*14))>.3,this.setRing(s++,a.x,a.ground,a.z,3.2*a.s),a.t>=a.warn){a.live=!1,this.explode(a.x,a.y,a.z,3.2*a.s,a),a.y<.5&&this.effect(a,a.x,a.z,!0);continue}}else if(a.phase==="fly"){if(this.ufo(a,e))continue}else if(a.phase==="wind"){if(this.tornado(a,e))continue}else if(a.phase==="buzz"){if(this.bee(a,e))continue}else if(a.phase==="roll"){if(this.rollStep(a,e,s))continue;a.t<tc&&(s+=4)}else if(a.phase==="lie"){if(a.adj==="bouncy"&&a.y<=a.ground+.01&&(a.vy=6),this.deadly(a)&&(l=.5+.5*Math.sin(a.t*9+a.seed),this.setRing(s++,a.x,a.ground,a.z,(this.reach(a)+.5)*(.9+.15*l))),a.t>a.life){a.live=!1,this.fx.emit("poof",this.v.set(a.x,a.y+.3,a.z),.5);continue}}else if(a.kind==="frog"?this.frog(a,e):this.run(a,e),a.t>a.life){a.live=!1,this.fx.emit("poof",this.v.set(a.x,a.y+.6,a.z),.7*a.s);continue}if(a.phase!=="fall"&&a.phase!=="drop"&&a.phase!=="fly"&&a.phase!=="wind"&&a.phase!=="buzz"&&a.phase!=="roll"){const g=this.h.heightAt(a.x,a.z);if(a.ground=g<=a.y+this.step(a)?g:a.ground,a.vy-=qn*e,a.y+=a.vy*e,a.y<=a.ground&&(a.vy<-9&&this.h.land?.(a.x,a.ground,a.z,a.s),a.y=a.ground,a.vy=0),(a.vy!==0||a.kind==="slime")&&(o=1+Math.sin(a.t*12)*.12),a.tick-=e,a.tick<=0&&a.y<.5&&(a.tick=hs,this.effect(a,a.x,a.z,!1),a.adj==="fire"&&this.fx.emit("lava",this.v.set(a.x,a.y+.6*a.s,a.z),.3)),a.y<t-.2){a.live=!1,this.fx.emit("lava",this.v.set(a.x,t+.3,a.z),.8);continue}if(Math.abs(a.kx)+Math.abs(a.kz)>.1){const f=a.x+a.kx*e,E=a.z+a.kz*e,y=this.body(a);this.free(f,E,a.y,y,1.2,Jo(a),a.ground+.05)?(a.x=f,a.z=E):a.kx=a.kz=0;const _=Math.exp(-(a.y>a.ground+.05?.8:5)*e);a.kx*=_,a.kz*=_}if(this.cellReact(a))continue;this.touch(a)}const d=this.meshes[a.kind],h=i[a.kind]++;if(h>=fn)continue;const u=a.kind==="meteor"||a.phase==="fall";Dt.position.set(a.x,a.y+(a.kind==="meteor"?.9*a.s:a.kind==="boulder"?a.s:0),a.z);const v=a.kind==="tornado"?a.t*9:a.kind==="ufo"?a.t*1.5:0;a.kind==="boulder"?(Dt.rotation.order="YXZ",Dt.rotation.set(a.roll,a.yaw,0)):a.kind==="dino"&&a.phase==="run"&&a.stun<=0&&(a.t+a.seed)%7>5?Dt.rotation.set(-.22+Math.sin(a.t*40)*.03,a.yaw,0):Dt.rotation.set(u?r:0,a.yaw+v+(u?r*.6:0),a.phase==="lie"||v?0:Math.sin(a.t*(a.kind==="bee"?30:14)+a.seed)*(a.kind==="bee"?.25:.08)),Dt.scale.set(a.s/Math.sqrt(o),a.s*o,a.s/Math.sqrt(o)),Dt.updateMatrix(),Dt.rotation.order="XYZ",d.setMatrixAt(h,Dt.matrix);const b=ic[a.kind],S=this.legs[a.kind];if(b&&S){const g=Math.hypot(a.vx,a.vz);a.gait=g>.3?a.gait+g*e*(3.2/Math.max(1,a.s*.8)):a.gait*Math.max(0,1-e*8);const f=Math.sin(a.gait)*b.swing*Math.min(1,g/2);for(const E of[-1,1])sc.makeRotationX(f*E).setPosition(b.x*E,b.hip,0),ac.multiplyMatrices(Dt.matrix,sc),S.setMatrixAt(h*2+(E>0?1:0),ac),S.setColorAt(h*2+(E>0?1:0),c?oc:l>=0?va.copy(ui[a.adj]).lerp(cc,l):va.copy(ui[a.adj]))}if(d.setColorAt(h,c?oc:l>=0?va.copy(ui[a.adj]).lerp(cc,l):va.copy(ui[a.adj])),a.adj==="fire"||a.kind==="meteor"){const g=a.kind==="meteor"?.6:a.kind==="ufo"||a.kind==="bee"?.3:a.kind==="tornado"?3:a.kind==="boulder"?1.9:.7;this.flames.add(a.x,a.y+g*a.s,a.z,.75*a.s,a.seed),(a.s>1.5||a.kind==="meteor")&&this.flames.add(a.x+.3*a.s,a.y+g*.8*a.s,a.z-.2*a.s,.55*a.s,a.seed+1.7)}if(a.adj==="fast"||a.stun>0)for(let g=0;g<2;g++){if(Math.random()<.25)continue;const f=Math.random()*6.28,E=.55*a.s;this.bolts.add(a.x+Math.cos(f)*E,a.y+Math.random()*.5*a.s,a.z+Math.sin(f)*E,(.8+Math.random()*.4)*a.s,Math.random()*10)}}for(const a in this.legs){const r=this.legs[a];r.count=Math.min(fn,i[a])*2,r.visible=r.count>0,r.count&&(r.instanceMatrix.needsUpdate=!0,r.instanceColor.needsUpdate=!0)}for(const a in this.meshes){const r=this.meshes[a];r.count=Math.min(fn,i[a]),r.visible=r.count>0,r.count&&(r.instanceMatrix.needsUpdate=!0,r.instanceColor.needsUpdate=!0)}this.beam.count=hi,this.beam.visible=hi>0,hi&&(this.beam.instanceMatrix.needsUpdate=!0),this.ring.count=s,this.ring.visible=s>0,s&&(this.ring.instanceMatrix.needsUpdate=!0)}setRing(e,t,i,s,a){e>=fn*3||(Dt.position.set(t,i+.06,s),Dt.rotation.set(0,0,0),Dt.scale.setScalar(a),Dt.updateMatrix(),this.ring.setMatrixAt(e,Dt.matrix))}explode(e,t,i,s,a){this.h.boom(e,t,i,s,a);let r=0;for(const o of this.mobs){if(!o.live||o.phase!=="run"&&o.phase!=="lie")continue;const c=o.x-e,l=o.z-i,d=Math.hypot(c,l),h=s*2.2;if(d>h||d<.3||Math.abs(o.y-t)>3)continue;const u=(1-d/h)*12/Math.max(1,o.s*.7);o.kx+=c/d*u,o.kz+=l/d*u,o.vy=Math.max(o.vy,5+u*.6),o.stun=0,r++}r>=2&&this.h.react("blast",e,i)}cellReact(e){if(e.y>.5||e.y>e.ground+.3||e.kind==="meteor")return!1;const t=this.surface.at(e.x,e.z);if(t===ut.Fire){if(e.kind==="snowman"&&e.adj!=="fire"){e.live=!1;for(const[i,s]of[[0,0],[2,0],[-2,0],[0,2],[0,-2]])this.surface.wetAt(e.x+i*e.s*.7,e.z+s*e.s*.7);return this.fx.emit("poof",this.v.set(e.x,e.y+1,e.z),1.2*e.s,[16777215,13627391]),this.h.react("snowMelt",e.x,e.z),!0}if(e.adj==="plain"||e.adj==="bouncy"||e.adj==="giant"){e.adj="fire",this.fx.emit("lava",this.v.set(e.x,e.y+.8*e.s,e.z),.6*e.s);const i=Ws(1,"fire",e.kind).join(" ").toUpperCase();this.h.react("catchFire",e.x,e.z,i+"!")}}else(t===ut.Wet||t===ut.Ice)&&e.adj==="fire"?(e.adj="plain",this.fx.emit("poof",this.v.set(e.x,e.y+.8*e.s,e.z),.9*e.s,[16777215,14214382]),this.h.react("douse",e.x,e.z)):t===ut.Shock&&e.adj!=="fast"&&e.stun<=0&&e.phase==="run"&&(e.stun=1.6,this.h.react("stun",e.x,e.z));return!1}deadly(e){return e.kind==="banana"&&(e.adj==="fire"||e.adj==="ice"||e.adj==="giant")}touch(e){const t=this.reach(e),i=this.h.hitDummies(e.x,e.y,e.z,e.kind==="banana"&&e.adj==="plain"?0:t,e.kind==="zombie");for(const[o,c]of i)this.spawnAt({n:1,adj:e.adj,noun:"zombie"},o,c,e.s);const s=this.h.target();if(!s)return;const a=s.x-e.x,r=s.z-e.z;if(!(a*a+r*r>t*t||s.y>e.y+1.3*e.s||s.y+1.6<e.y)){if(e.kind==="banana"){this.deadly(e)?this.h.touchPlayer(e,!0,a,r):this.h.slip();return}this.h.touchPlayer(e,!((e.kind==="chicken"||e.kind==="frog")&&e.adj==="plain"),a,r)}}}class Uv{constructor(e){this.heartsN=-1,this.bannerT=0,Nv(),Vs(),this.timer=Zn("rui-timer",e);const t=this.timer.appendChild(document.createElement("i"));t.className="rui-clock",t.textContent="⏱",lc(t,"clock"),this.timerValue=this.timer.appendChild(document.createElement("span")),this.hearts=Zn("rui-hearts",e),this.banner=Zn("rui-banner",e),this.panel=Zn("rui-panel",e);const i=Zn("rui-card",this.panel);this.title=Zn("rui-title",i),this.sub=Zn("rui-sub",i);const s=document.createElement("button");s.className="rui-btn",s.textContent="ЕЩЁ РАЗ",s.addEventListener("click",()=>this.onRetry?.()),i.appendChild(s),this.retryBtn=s}setLabels(e){this.retryBtn.textContent=e}setTime(e){const t=Math.max(0,Math.ceil(e));this.timerValue.textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`,this.timer.classList.toggle("hot",t<=10)}setHearts(e,t){if(this.hearts.childElementCount!==t){this.hearts.replaceChildren();for(let i=0;i<t;i++)lc(this.hearts.appendChild(document.createElement("i")),"heart")}Array.from(this.hearts.children).forEach((i,s)=>i.classList.toggle("lost",s>=e)),e<this.heartsN&&(this.hearts.classList.remove("hit"),this.hearts.offsetWidth,this.hearts.classList.add("hit")),this.heartsN=e}announce(e,t="#ffd23a"){this.banner.textContent=e,this.banner.style.color=t,this.banner.classList.remove("show"),this.banner.offsetWidth,this.banner.classList.add("show"),this.bannerT=2.2}showResult(e,t,i){this.title.textContent=e,this.title.classList.toggle("win",i),this.sub.textContent=t,this.panel.classList.add("show")}hideResult(){this.panel.classList.remove("show")}get resultOpen(){return this.panel.classList.contains("show")}setHud(e){this.timer.style.display=this.hearts.style.display=e?"":"none",e||(this.bannerT=0,this.banner.classList.remove("show"))}update(e){this.bannerT>0&&(this.bannerT-=e)<=0&&this.banner.classList.remove("show")}}function Zn(n,e){const t=document.createElement("div");return t.className=n,e.appendChild(t),t}function lc(n,e){n.setAttribute("aria-hidden","true");const t=document.createElement("img");t.alt="",t.draggable=!1,t.onload=()=>{n.classList.add("has-art"),n.replaceChildren(t)},t.src=`./assets/ui/icons/${e}.webp?v=mwpzjthk`}let dc=!1;function Nv(){if(dc)return;dc=!0;const n=document.createElement("style");n.textContent=`
:root{--u:min(1vw,1vh,8px)}
.rui-timer,.rui-hearts,.rui-banner{--hud-u:min(1vh,8px);--hud-u:min(1dvh,8px);--hud-ink:#2a1250;--hud-font:Nunito,"Arial Black",system-ui,sans-serif}
.rui-timer,.rui-hearts{position:absolute;top:calc(env(safe-area-inset-top) + max(8px,2.2*var(--u)));z-index:6;display:flex;pointer-events:none}
.rui-timer{left:50%;translate:-50% 0;align-items:center;justify-content:center;gap:.28em;
  min-width:4.25em;padding:.22em .34em;box-sizing:border-box;border-radius:999px;
  background:linear-gradient(#643a96,#351b63 62%,#2a144f);border:clamp(3px,calc(.64*var(--hud-u)),5px) solid #201038;
  color:#fff;font:900 clamp(18px,min(5.2vw,calc(4.7*var(--hud-u))),39px)/1 var(--hud-font);
  font-variant-numeric:tabular-nums;white-space:nowrap;-webkit-text-stroke:.1em #211037;paint-order:stroke fill;text-shadow:0 .09em #211037;
  box-shadow:inset 0 2px #d7acff8c,0 clamp(3px,calc(.65*var(--hud-u)),6px) #22113b}
.rui-clock,.rui-hearts i{display:grid;place-items:center;aspect-ratio:1;flex:none;font-style:normal}
.rui-clock{width:1.05em;-webkit-text-stroke:0;text-shadow:none}
.rui-clock img,.rui-hearts img{display:block;width:100%;height:100%;object-fit:contain}
.rui-timer.hot{background:linear-gradient(#ff737e,#de2443 64%,#a50c35);border-color:#47102a;
  box-shadow:inset 0 2px #ffd1d6a8,0 clamp(3px,calc(.65*var(--hud-u)),6px) #791435;animation:ruiUrgent .85s ease-in-out infinite}
@keyframes ruiUrgent{50%{transform:scale(1.065)}}
.rui-hearts{left:calc(env(safe-area-inset-left) + max(8px,2.2*var(--u)));gap:clamp(2px,.65vw,6px)}
.rui-hearts i{width:clamp(21px,min(6.3vw,calc(6.5*var(--hud-u))),53px);transition:transform .2s,opacity .2s;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.5 3.2 12.9A5.4 5.4 0 0 1 12 6.1a5.4 5.4 0 0 1 8.8 6.8z' fill='%23ff3b4e' stroke='%23fff' stroke-width='2.2' stroke-linejoin='round'/%3E%3Cpath d='M7.4 8.6a2.4 2.4 0 0 1 2.6-.9' stroke='%23fff' stroke-width='1.6' stroke-linecap='round' fill='none' opacity='.8'/%3E%3C/svg%3E") center/contain no-repeat;
  filter:drop-shadow(0 2px 0 #2a1250a8)}
.rui-hearts i.has-art{background:none}
.rui-hearts i.lost{filter:grayscale(1) brightness(.78);opacity:.62;transform:scale(.79)}
.rui-hearts.hit{animation:ruiHit .4s}
@keyframes ruiHit{0%,100%{transform:none}25%{transform:translateX(-6px) rotate(-4deg)}50%{transform:translateX(6px) rotate(4deg)}75%{transform:translateX(-3px)}}
/* телефон вертикально: по центру барабан с большой СТОП — фраза волны выше него и поверх (заказчик: текст был за кнопкой) */
@media (pointer:coarse) and (orientation:portrait){.rui-banner{top:16%!important}}
.rui-banner{position:absolute;inset-inline:calc(env(safe-area-inset-left) + 14px) calc(env(safe-area-inset-right) + 14px);top:30%;
  margin-inline:auto;width:max-content;max-width:calc(100% - env(safe-area-inset-left) - env(safe-area-inset-right) - 28px);
  translate:0 -50%;z-index:8;opacity:0;pointer-events:none;color:#fff;text-align:center;text-wrap:balance;
  font:900 clamp(24px,min(7.5vw,calc(8.2*var(--hud-u))),68px)/1.08 var(--hud-font);
  -webkit-text-stroke:clamp(4px,calc(1.2*var(--hud-u)),10px) var(--hud-ink);paint-order:stroke fill;
  text-shadow:0 clamp(3px,calc(.92*var(--hud-u)),8px) var(--hud-ink);transition:opacity .2s}
.rui-banner.show{opacity:1;animation:ruiBanner .42s both}
@keyframes ruiBanner{0%{transform:translateY(12px) scale(.58);opacity:0}64%{transform:translateY(-4px) scale(1.045);opacity:1}100%{transform:none}}
@media (prefers-reduced-motion:reduce){.rui-banner,.rui-hearts i{transition:none}.rui-banner.show,.rui-timer.hot,.rui-hearts.hit{animation:none}}
.rui-panel{position:absolute;inset:0;z-index:9;display:none;align-items:center;justify-content:center;background:rgba(10,25,60,.35)}
.rui-panel.show{display:flex}
.rui-card{display:flex;flex-direction:column;align-items:center;gap:calc(2*var(--u));padding:calc(4*var(--u)) calc(6*var(--u));
  max-width:86vw;border-radius:calc(3.5*var(--u));background:#fff;border:calc(.8*var(--u)) solid #1d3f86;box-shadow:0 calc(1.2*var(--u)) 0 rgba(0,0,0,.25)}
.rui-title{font:900 calc(7.5*var(--u))/1 Nunito,system-ui,sans-serif;color:#d8313a;text-align:center}
.rui-title.win{color:#2fa84a}
.rui-sub{font:700 calc(3.6*var(--u))/1.2 Nunito,system-ui,sans-serif;color:#1d3f86;text-align:center}
.rui-btn{min-width:calc(34*var(--u));min-height:44px;padding:calc(2*var(--u)) calc(5*var(--u));border:none;border-radius:calc(2.5*var(--u));cursor:pointer;
  background:linear-gradient(#ffdc4a,#f2a91a);color:#5a2a00;font:900 calc(5*var(--u))/1 Nunito,system-ui,sans-serif;
  box-shadow:0 calc(.9*var(--u)) 0 #b06a0a;border:calc(.5*var(--u)) solid #fff}
.rui-btn:active{transform:translateY(calc(.5*var(--u)));box-shadow:0 calc(.4*var(--u)) 0 #b06a0a}
`,document.head.appendChild(n)}const Ov=!1;async function ps(){return await gt.ads.rewarded()?!0:Ov}function Os(){return gt.ads.rewardedAvailable}async function Fv(){await gt.ads.interstitial()}class kv{constructor(e,t){this.L=t,this.cards=new Map,this.pending=new Set,this.returnFocus=null,vl(),this.overlay=$t("section",e,"chr-overlay"),this.overlay.inert=!0,this.overlay.setAttribute("role","dialog"),this.overlay.setAttribute("aria-modal","true"),this.overlay.setAttribute("aria-label",t("Персонажи","Characters"));const i=$t("header",this.overlay,"chr-header");this.back=ms(i,"chr-candy chr-back",()=>this.onClose?.()),this.back.textContent="←",this.back.setAttribute("aria-label",t("Назад","Back")),$t("h2",i,"chr-title").textContent=t("ПЕРСОНАЖИ","CHARACTERS"),this.coins=Fs(i,"",t("Монеты","Coins")),this.grid=$t("div",this.overlay,"chr-grid"),this.grid.addEventListener("touchmove",s=>s.stopPropagation(),{passive:!0}),this.overlay.addEventListener("click",s=>{s.target.closest("button")&&Ve.play("click",.05)}),document.addEventListener("keydown",s=>this.handleKey(s),!0)}show(e){const t=this.state,i=this.open;this.state={...e,owned:[...e.owned],adViews:{...e.adViews}},this.coins.textContent=String(e.coins),i||(this.returnFocus=document.activeElement instanceof HTMLElement?document.activeElement:null,this.overlay.inert=!1,this.overlay.classList.add("chr-visible"),this.grid.scrollTop=0,this.back.focus({preventScroll:!0}));for(const s of Qi){const a=t?.owned.includes(s.id),r=e.owned.includes(s.id);(!this.cards.has(s.id)||r!==a)&&this.replaceCard(s,r,a===!1&&r),this.syncCard(s)}}hide(){this.open&&(this.overlay.inert=!0,this.overlay.classList.remove("chr-visible"),this.returnFocus?.focus({preventScroll:!0}),this.returnFocus=null)}get open(){return!this.overlay.inert}replaceCard(e,t,i){const s=this.cards.get(e.id),a=s?.contains(document.activeElement),r=document.createElement(t?"button":"article");r.className="chr-card",r instanceof HTMLButtonElement&&(r.type="button",r.classList.add("chr-owned"),r.addEventListener("click",()=>this.onSelect?.(e.id)));const o=this.L(e.ru,e.en),c=$t("span",r,"chr-portrait");c.setAttribute("aria-hidden","true");const l=$t("span",c,"chr-letter");l.textContent=Array.from(o)[0],ka(c,`chars/${e.id}`,l),$t("span",r,"chr-name").textContent=o;const d=$t("span",r,t?"chr-check":"chr-lock");if(d.setAttribute("aria-hidden","true"),t?d.textContent="✓":d.innerHTML='<svg viewBox="0 0 24 24" width="62%" height="62%"><path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="#4f3471" stroke-width="3" stroke-linecap="round"/><rect x="4" y="10" width="16" height="12" rx="3" fill="#ffc83d" stroke="#4f3471" stroke-width="2.2"/><circle cx="12" cy="16" r="2" fill="#4f3471"/></svg>',!t){const h=$t("div",r,"chr-actions"),u=ms(h,"chr-candy chr-buy",()=>this.onBuy?.(e.id));if(u.append(bi("coin"),String(e.price)),u.setAttribute("aria-label",this.L(`Купить: ${o}, монет: ${e.price}`,`Buy ${o} for ${e.price} coins`)),e.ads>0&&Os()){const v=ms(h,"chr-candy chr-ad",()=>{this.watchAd(e)});v.append(bi("ad")),$t("span",v,"chr-ad-count")}}i&&r.classList.add("chr-unlocked"),s?s.replaceWith(r):this.grid.append(r),this.cards.set(e.id,r),a&&r.querySelector("button")?.focus({preventScroll:!0}),a&&t&&r.focus({preventScroll:!0})}syncCard(e){const t=this.cards.get(e.id),i=this.state;if(!t||!i)return;if(t instanceof HTMLButtonElement){t.setAttribute("aria-pressed",String(e.id===i.selected));return}const s=t.querySelector(".chr-buy");s.disabled=i.coins<e.price;const a=t.querySelector(".chr-ad");if(!a)return;const r=i.adViews[e.id]??0,o=this.pending.has(e.id);a.disabled=o,a.setAttribute("aria-busy",String(o));const c=this.L(e.ru,e.en);a.setAttribute("aria-label",o?this.L(`Ждём ролик за персонажа ${c}`,`Waiting for the video for ${c}`):this.L(`Ролик за персонажа ${c}, просмотрено ${r} из ${e.ads}`,`Watch a video for ${c}, ${r} of ${e.ads} watched`)),a.querySelector(".chr-ad-count").textContent=this.L(`${r}/${e.ads}`,`${r}/${e.ads}`)}async watchAd(e){if(!(this.pending.has(e.id)||!this.onAd)){this.pending.add(e.id),this.syncCard(e);try{await this.onAd(e.id)}catch{}finally{this.pending.delete(e.id),this.syncCard(e)}}}handleKey(e){if(!this.open||e.defaultPrevented||e.isComposing||e.altKey||e.ctrlKey||e.metaKey||(e.stopPropagation(),e.key!=="Tab"))return;const t=this.overlay.querySelectorAll("button:not(:disabled)"),i=document.activeElement,s=t[t.length-1];(!this.overlay.contains(i)||(e.shiftKey?i===this.back:i===s))&&(e.preventDefault(),(e.shiftKey?s:this.back).focus())}}function $t(n,e,t){const i=document.createElement(n);return i.className=t,e.append(i),i}function ms(n,e,t){const i=$t("button",n,e);return i.type="button",i.addEventListener("click",t),i}function ka(n,e,t){const i=$t("img",n,"chr-image");i.alt="",i.draggable=!1,i.hidden=!0,i.onload=()=>{t.setAttribute("hidden",""),i.hidden=!1},i.onerror=()=>i.remove(),i.src=`./assets/${e}.webp?v=mwpzjthk`}function bi(n){vl();const e=document.createElement("span");return e.className=`chr-icon chr-icon-${n}`,e.setAttribute("aria-hidden","true"),$t("span",e,"chr-icon-fallback"),ka(e,`ui/icons/${n}`,e.firstElementChild),e}function Fs(n,e,t){const i=$t("span",n,`chr-wallet ${e}`);return i.setAttribute("role","group"),i.setAttribute("aria-label",t),i.append(bi("coin")),$t("span",i,"chr-wallet-value")}let fc=!1;function vl(){if(fc)return;fc=!0;const n=document.createElement("style");n.textContent=`
.chr-icon { width:1.15em; aspect-ratio:1; flex:none; display:grid; place-items:center; pointer-events:none; }
.chr-image { width:100%; height:100%; object-fit:contain; pointer-events:none; }
.chr-icon-fallback { display:block; }
.chr-icon-coin .chr-icon-fallback {
  width:90%; aspect-ratio:1; box-sizing:border-box; border:2px solid #a75310; border-radius:50%;
  background:radial-gradient(circle at 33% 25%,#fff7aa,#ffd62e 54%,#fca61b 78%);
  box-shadow:inset 0 0 0 1px #fff5a5,0 1px #843b16;
}
.chr-icon-ad .chr-icon-fallback {
  width:70%; height:76%; background:currentColor; clip-path:polygon(9% 0,100% 50%,9% 100%);
}
.chr-image[hidden],.chr-icon-fallback[hidden],.chr-portrait [hidden] { display:none; }
.chr-wallet {
  display:inline-flex; align-items:center; justify-content:center; gap:.35em; flex:none;
  min-width:3.35em; padding:.2em .45em; border:2px solid #663214; border-radius:999px;
  background:linear-gradient(#fff4a4,#ffd345 62%,#ffad26); box-shadow:inset 0 2px #fffacd,0 3px #934513;
  color:#552409; font-weight:900; -webkit-text-stroke:0; text-shadow:0 1px #fff3b7;
  white-space:nowrap; font-variant-numeric:tabular-nums;
}
.chr-overlay {
  --u:min(1vh,8px); --u:min(1dvh,8px); --ink:#2a1250; --line:clamp(2px,calc(.55 * var(--u)),5px);
  position:absolute; inset:0; z-index:30; display:grid; justify-items:center;
  grid-template-rows:auto minmax(0,1fr); gap:clamp(8px,calc(1.6 * var(--u)),14px);
  padding:calc(env(safe-area-inset-top) + 10px) calc(env(safe-area-inset-right) + 8px)
    calc(env(safe-area-inset-bottom) + 7px) calc(env(safe-area-inset-left) + 8px);
  background:radial-gradient(ellipse at 50% 42%,#59359391,#21134bc4);
  color:#fff; font:900 clamp(13px,calc(2.6 * var(--u)),22px)/1.12 Nunito,"Arial Black",system-ui,sans-serif;
  opacity:0; visibility:hidden; pointer-events:none;
  transition:opacity .18s ease-in,visibility 0s .18s;
}
.chr-overlay * { box-sizing:border-box; }
.chr-overlay.chr-visible { opacity:1; visibility:visible; pointer-events:auto; transition:opacity .16s ease-out; }
.chr-header {
  width:min(100%,1100px); padding-inline:4px; display:grid;
  grid-template-columns:minmax(44px,1fr) auto minmax(max-content,1fr); gap:6px; align-items:center;
}
.chr-header .chr-wallet { justify-self:end; }
.chr-title {
  margin:0; padding:.25em .42em .3em; border:var(--line) solid var(--ink); border-radius:.6em;
  background:linear-gradient(#ff9dc8,#ff4b90 42%,#de1664); box-shadow:inset 0 2px #ffffffad,0 4px #831445;
  color:#fff; font-size:clamp(16px,min(5.8vw,calc(5.8 * var(--u))),46px); font-weight:900;
  -webkit-text-stroke:clamp(2px,calc(.62 * var(--u)),5px) var(--ink); paint-order:stroke fill;
  text-shadow:0 2px var(--ink);
}
.chr-candy {
  --top:#61dbff; --bottom:#1682df; --edge:#204c91;
  display:flex; align-items:center; justify-content:center; gap:3px; cursor:pointer; touch-action:manipulation;
  padding:0; border:var(--line) solid var(--ink); border-radius:999px;
  background:linear-gradient(175deg,#ffffff56,transparent 46%),linear-gradient(var(--top),var(--bottom));
  box-shadow:inset 0 2px #ffffff9c,0 3px var(--edge),0 4px var(--ink); color:#fff;
  font:inherit; -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; text-shadow:0 1px var(--ink);
}
/* низ вертикального телефона перехватывают жест «домой» и панель браузера */
@media (orientation:portrait) and (max-width:550px) { .chr-overlay { padding-bottom:calc(env(safe-area-inset-bottom) + max(7px, 5dvh)); } }
/* зона нажатия с «толщиной» снизу: на телефоне палец попадает в низ кнопки */
.chr-candy { position:relative; }
.chr-candy::after { content:''; position:absolute; inset:-4px -4px -9px; border-radius:inherit; }
.chr-candy:active:not(:disabled) { translate:0 2px; box-shadow:inset 0 2px #ffffff9c,0 1px var(--edge),0 2px var(--ink); }
.chr-overlay button:focus-visible { outline:2px solid #fff; outline-offset:2px; }
.chr-back { width:clamp(44px,calc(7 * var(--u)),60px); aspect-ratio:1; font-size:clamp(26px,calc(5 * var(--u)),40px); }
.chr-grid {
  width:min(100%,1100px); min-height:0; display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); align-content:start;
  gap:clamp(8px,calc(2 * var(--u)),16px); padding:5px 4px 10px; overflow:auto;
  scrollbar-width:thin; scrollbar-color:#e5b4ff transparent; overscroll-behavior:contain; touch-action:pan-y;
}
.chr-card {
  position:relative; min-width:0; color:var(--ink); display:flex; flex-direction:column; align-items:center;
  padding:4px 3px 6px; gap:clamp(3px,var(--u),8px);
  border:var(--line) solid var(--ink); border-radius:clamp(12px,calc(3.6 * var(--u)),27px);
  background:linear-gradient(#fff9e8,#eae2ff 70%,#d5c4ff);
  box-shadow:inset 0 0 0 2px #fff9,0 4px #6546a7,0 6px var(--ink);
}
.chr-owned { cursor:pointer; touch-action:manipulation; min-height:44px; font:inherit; }
.chr-owned:active { translate:0 2px; }
.chr-owned[aria-pressed="true"] {
  border-color:#793d13; background:linear-gradient(#fffbd7,#ffe599);
  box-shadow:inset 0 2px #fffdfa,0 4px #be681b,0 0 0 2px #ffdc63;
}
.chr-portrait {
  width:min(100%,clamp(55px,calc(17 * var(--u)),128px)); aspect-ratio:1;
  display:grid; place-items:center; border-radius:28%;
  background:radial-gradient(ellipse at 50% 46%,#fff9 12%,#c5a9ff 92%);
}
.chr-letter {
  font-size:clamp(27px,calc(7.2 * var(--u)),55px); line-height:1; color:#fff;
  -webkit-text-stroke:clamp(2px,calc(.6 * var(--u)),5px) #573581; paint-order:stroke fill; text-shadow:0 2px #573581;
}
.chr-card:not(.chr-owned) .chr-portrait { background:radial-gradient(ellipse,#c4b1e3,#9582b8); }
.chr-card:not(.chr-owned) .chr-portrait > * { filter:brightness(.53) saturate(.48); }
.chr-name { max-width:100%; text-align:center; line-height:1; padding-inline:1px; text-wrap:balance; }
.chr-check,.chr-lock {
  position:absolute; top:3px; right:3px; width:clamp(20px,calc(4.2 * var(--u)),32px); aspect-ratio:1;
  display:grid; place-items:center; border:2px solid #4f3471; border-radius:50%; background:#e7d6ff;
  color:#fff; font-size:clamp(12px,calc(2.7 * var(--u)),20px); line-height:1;
}
.chr-check { display:none; border-color:#174d17; background:linear-gradient(#9bf94d,#2fc827 65%,#179516); box-shadow:inset 0 2px #ecffb9,0 2px #173d18; }
.chr-owned[aria-pressed="true"] .chr-check { display:grid; }
.chr-actions { display:flex; gap:3px; width:100%; margin-top:auto; }
.chr-actions > button {
  flex:1 1 0; min-width:0; height:clamp(36px,calc(5 * var(--u)),40px); border-width:2px;
  font-size:clamp(13px,calc(2.05 * var(--u)),17px); font-variant-numeric:tabular-nums; white-space:nowrap;
}
.chr-buy { --top:#ffdf55; --bottom:#ffa014; --edge:#a95210; color:#552409; -webkit-text-stroke:0; text-shadow:0 1px #fff0a8; }
.chr-ad { --top:#b679ff; --bottom:#7131e3; --edge:#4d1b94; }
.chr-actions button:disabled { opacity:.55; cursor:default; }
.chr-ad[aria-busy="true"] { cursor:wait; }
.chr-ad[aria-busy="true"] .chr-icon { animation:chr-wait .7s ease-in-out infinite alternate; }
.chr-unlocked { animation:chr-unlock .4s cubic-bezier(.2,.8,.35,1) both; }
@keyframes chr-wait { to { opacity:.32; } }
@keyframes chr-unlock { 0% { scale:.85; } 64% { scale:1.07; } 100% { scale:1; } }
@media (max-width:560px) {
  .chr-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
  .chr-actions .chr-icon { width:1em; }
  /* узкий телефон: цена и реклама рядом не влезали (обрезалось «0/1») — ставим друг под другом */
  .chr-actions { flex-direction:column; gap:4px; }
  .chr-actions > button { flex:none; width:100%; height:34px; }
}
@media (orientation:landscape) and (max-height:430px) and (max-width:599px) {
  .chr-grid { grid-template-columns:repeat(4,minmax(0,1fr)); }
}
@media (prefers-reduced-motion:reduce) {
  .chr-overlay,.chr-overlay.chr-visible { transition:none; }
  .chr-ad[aria-busy="true"] .chr-icon,.chr-unlocked { animation:none; }
}
`,document.head.append(n)}const uc={easy:{name:["Лёгкий","Easy"],hint:["4 сердечка, всё медленнее","4 hearts, slower chaos"]},normal:{name:["Обычный","Normal"],hint:["3 сердечка","3 hearts"]},chaos:{name:["Хаос","Chaos"],hint:["2 сердечка, всё быстрее!","2 hearts, faster chaos!"]}},Bv=["easy","normal","chaos"],Gv={easy:'<g fill="#fff"><circle cx="12" cy="6" r="4"/><circle cx="18" cy="10.5" r="4"/><circle cx="16" cy="17.5" r="4"/><circle cx="8" cy="17.5" r="4"/><circle cx="6" cy="10.5" r="4"/></g><circle cx="12" cy="12" r="3.5" fill="#ffd23a"/>',normal:'<path fill="#edfaff" d="M12 2 3.5 5.4v5.4c0 5.1 3.2 9 8.5 11.2 5.3-2.2 8.5-6.1 8.5-11.2V5.4Z"/><path d="m8 12 2.5 2.5 5.5-6" fill="none" stroke="#2456ad" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',chaos:'<path fill="#ffdf56" stroke="#fff4c1" stroke-linejoin="round" d="M13.8 1.5 4.5 13.2H11l-1 9.3L19.5 10H13Z"/>',person:'<circle cx="12" cy="5" r="3.5" fill="currentColor"/><path fill="currentColor" d="M8 10h8a3 3 0 0 1 3 3v3h-3v6h-3v-5h-2v5H8v-6H5v-3a3 3 0 0 1 3-3Z"/>',sound:'<path fill="currentColor" d="M3 9h4l5-4v14l-5-4H3Z"/><path d="M15 9a4 4 0 0 1 0 6m2.5-9a8 8 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',muted:'<path fill="currentColor" d="M3 9h4l5-4v14l-5-4H3Z"/><path d="m16 9 5 6m0-6-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',pause:'<rect x="5.5" y="4" width="4.5" height="16" rx="1.5" fill="currentColor"/><rect x="14" y="4" width="4.5" height="16" rx="1.5" fill="currentColor"/>',check:'<path d="m5 12 4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',hills:'<path fill="#9fe36a" d="M1 20 8 9l4 5 3-4 8 10Z"/><path fill="#fff" d="m8 9 2 3H6Z"/>',pyramid:'<path fill="#ffd77a" d="M12 4 22 20H2Z"/><path d="M5.5 15h13M8 11h8" stroke="#c99e58" stroke-width="1.6"/>',trophy:'<path fill="#ffd23a" d="M7 3h10v6a5 5 0 0 1-10 0Z"/><path d="M7 5H4.5a3 3 0 0 0 3 4.5M17 5h2.5a3 3 0 0 1-3 4.5" fill="none" stroke="#ffd23a" stroke-width="2"/><path fill="#ffd23a" d="M10.5 13.5h3v3.5h-3zM7.5 18h9l.8 3H6.7Z"/><path d="M10 6.5h4" stroke="#fff6c2" stroke-width="1.6" stroke-linecap="round"/>',book:'<path fill="currentColor" d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5a1.5 1.5 0 0 0 0 3H20v1H6.5A2.5 2.5 0 0 1 4 19.5Z"/><path d="M12 6.5v3m0 2.6v.4" stroke="#1580e8" stroke-width="2.4" stroke-linecap="round"/>'};class Hv{constructor(e,t){this.L=t,this.map="hills",this.soundButtons=[],this.screen=null,this.difficulty="normal",this.muted=!1,this.pauseVisible=!1,this.coins=0,this.reward=0,this.rewardTimer=0,this.resultVersion=0,this.mapTipTimer=0,zv(),Vs(),this.overlay=tt("div",e,"mnu-overlay"),this.overlay.inert=!0,this.overlay.addEventListener("click",_=>{_.target.closest("button")&&Ve.play("click",.05)});const i=this.panel("mnu-main"),s=Fs(this.overlay,"mnu-main-wallet",t("Монеты","Coins")),a=tt("h1",i,"mnu-logo"),r=tt("span",a,"mnu-logo-text");tt("span",r,"mnu-logo-top").textContent=t("КРУТИ","SPIN THE"),tt("span",r,"mnu-logo-bottom").textContent=t("ХАОС!","CHAOS!"),a.setAttribute("aria-label",t("Крути хаос!","Spin the Chaos!")),_l(a,t("logo","logo_en"),r);const o=tt("div",i,"mnu-choices");o.setAttribute("role","group"),o.setAttribute("aria-label",t("Сложность","Difficulty")),this.modes={easy:this.modeButton(o,"easy"),normal:this.modeButton(o,"normal"),chaos:this.modeButton(o,"chaos")};const c=tt("div",i,"mnu-play-slot");this.playButton=Yt(c,"mnu-primary mnu-play",t("ИГРАТЬ","PLAY"),()=>this.onPlay?.(this.difficulty));const l=tt("div",i,"mnu-tools");this.charactersButton=Yt(l,"mnu-blue mnu-characters","",()=>this.onCharacters?.()),this.charactersButton.setAttribute("aria-label",t("Персонажи","Characters")),this.mapButton=Yt(l,"mnu-blue mnu-characters mnu-map","",()=>{this.setMap(this.map==="hills"?"pyramid":"hills",!0),this.onMap?.(this.map)}),this.mapTip=tt("span",l,"mnu-map-tip"),this.mapTip.setAttribute("aria-live","polite"),this.setMap("hills");const d=Yt(l,"mnu-blue mnu-characters mnu-book","",()=>this.onEncyclopedia?.());d.append(Bn("book")),d.setAttribute("aria-label",t("Энциклопедия хаоса","Chaos encyclopedia")),this.boardButton=Yt(l,"mnu-blue mnu-characters mnu-book mnu-board","",()=>this.onLeaderboard?.()),this.boardButton.append(Bn("trophy")),this.boardButton.setAttribute("aria-label",t("Рекорды","Leaderboard")),this.boardButton.hidden=!0,this.soundButton(l);const h=this.panel("mnu-card mnu-result");this.resultTitle=tt("h2",h,"mnu-result-title"),this.record=tt("span",h,"mnu-record"),this.record.textContent=t("НОВЫЙ РЕКОРД!","NEW RECORD!"),this.cause=tt("p",h,"mnu-cause");const u=tt("div",h,"mnu-stats");this.timeLabel=tt("span",u,"mnu-time"),this.progress=tt("div",u,"mnu-progress"),this.progress.setAttribute("role","progressbar"),this.progress.setAttribute("aria-valuemin","0"),this.fill=tt("div",this.progress,"mnu-fill"),this.botsLabel=tt("span",u,"mnu-bots-label"),this.bots=tt("div",u,"mnu-bots"),this.bots.setAttribute("aria-hidden","true");const v=tt("div",h,"mnu-best-row");this.best=tt("span",v,"mnu-best"),this.resultMode=tt("span",v,"mnu-badge");const b=tt("div",h,"mnu-rewards"),S=tt("span",b,"mnu-earned");S.setAttribute("role","group"),S.setAttribute("aria-label",t("Монеты за раунд","Coins earned this round")),this.rewardAmount=tt("span",S,"mnu-earned-amount"),S.append(bi("coin")),this.doubleButton=Yt(b,"mnu-blue mnu-double",t("×2","×2"),()=>{this.doubleReward()}),this.doubleButton.append(bi("ad")),this.balances=[s,Fs(b,"mnu-result-wallet",t("Всего монет","Total coins"))],this.reviveButton=Yt(h,"mnu-blue mnu-revive",t("ОЖИТЬ","REVIVE"),()=>{this.revive()}),this.reviveButton.append(bi("ad")),this.reviveButton.setAttribute("aria-label",t("Ожить за рекламный ролик","Watch an ad to revive"));const g=tt("div",h,"mnu-actions");this.retryButton=Yt(g,"mnu-primary",t("ЕЩЁ РАЗ","PLAY AGAIN"),()=>this.onRetry?.()),Yt(g,"mnu-secondary",t("МЕНЮ","MENU"),()=>this.onMenu?.());const f=this.panel("mnu-card mnu-pause"),E=tt("h2",f,"mnu-pause-title");E.textContent=t("ПАУЗА","PAUSED"),this.resumeButton=Yt(f,"mnu-primary mnu-resume",t("ПРОДОЛЖИТЬ","RESUME"),()=>this.onResume?.());const y=tt("div",f,"mnu-actions");Yt(y,"mnu-secondary",t("ЗАНОВО","RESTART"),()=>this.onRetry?.()),Yt(y,"mnu-secondary",t("МЕНЮ","MENU"),()=>this.onMenu?.()),this.soundButton(f),this.screens={main:i,result:h,pause:f},this.pauseButton=Yt(e,"mnu-blue mnu-corner","",()=>{Ve.play("click",.05),this.onPause?.()}),this.pauseButton.setAttribute("aria-label",t("Пауза","Pause")),this.pauseButton.append(Bn("pause")),this.syncPauseButton(),document.addEventListener("keydown",_=>this.handleKey(_))}showMain(e,t,i,s){this.select(e),this.setMuted(t),this.show("main",this.L("Крути хаос!","Spin the Chaos!")),this.setCoins(i);const a=Ta(s).id;if(a!==this.skin){this.skin=a;const r=tt("span",this.charactersButton,"mnu-art");r.setAttribute("aria-hidden","true"),ka(r,`chars/${a}`,r.appendChild(Bn("person"))),this.charactersButton.replaceChildren(r)}}setCoins(e){const t=e>this.coins;this.coins=e;for(const i of this.balances)i.textContent=String(e),t&&i.getClientRects().length&&this.bounce(i)}showResult(e){const{L:t}=this,i=this.screens.result;i.classList.toggle("mnu-win",e.win),this.resultTitle.textContent=e.title,this.cause.textContent=e.win?"":e.cause??"",this.cause.hidden=!this.cause.textContent,this.record.hidden=!e.newBest,this.timeLabel.textContent=t(`Продержался ${e.time} из ${e.round} с`,`Survived ${e.time} of ${e.round} s`);const s=Math.min(Math.max(e.time,0),Math.max(e.round,0));this.progress.setAttribute("aria-label",t("Время выживания","Survival time")),this.progress.setAttribute("aria-valuemax",String(e.round)),this.progress.setAttribute("aria-valuenow",String(s)),this.progress.setAttribute("aria-valuetext",this.timeLabel.textContent),this.fill.style.setProperty("--mnu-progress",String(e.round>0?s/e.round:0)),this.botsLabel.textContent=t(`Выжили: ${e.botsAlive} из ${e.botsTotal} игроков`,`Survivors: ${e.botsAlive} of ${e.botsTotal} players`),this.bots.replaceChildren(),this.bots.hidden=e.botsTotal===0;for(let o=0;o<e.botsTotal;o++){const c=Bn("person");o<e.botsAlive&&c.classList.add("mnu-alive"),this.bots.append(c)}this.best.textContent=t(`Рекорд: ${e.best} с`,`Best: ${e.best} s`),this.resultMode.className=`mnu-badge mnu-${e.difficulty}`;const[a,r]=uc[e.difficulty].name;this.resultMode.textContent=t(a,r),this.resultVersion++,this.doubleButton.hidden=e.coins===0||!Os(),this.reviveButton.hidden=!e.canRevive||!Os(),this.reviveButton.disabled=!1,this.setDoubleWaiting(!1),i.classList.remove("mnu-celebrate"),i.offsetWidth,i.classList.add("mnu-celebrate"),this.show("result",e.title),this.setCoins(e.total),this.countReward(e.coins)}showPause(e){this.setMuted(e),this.show("pause",this.L("Пауза","Paused"))}hide(){window.clearInterval(this.rewardTimer),this.screen=null,this.overlay.inert=!0,this.overlay.classList.remove("mnu-visible"),this.syncPauseButton()}get open(){return this.screen!==null}setPauseButton(e){this.pauseVisible=e,this.syncPauseButton()}panel(e){const t=tt("section",this.overlay,`mnu-panel ${e}`);return t.hidden=!0,t.tabIndex=-1,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t}show(e,t){e!=="result"&&window.clearInterval(this.rewardTimer),this.screen=e;for(const s of Object.values(this.screens))s.hidden=s!==this.screens[e];const i=this.screens[e];i.setAttribute("aria-label",t),this.overlay.inert=!1,this.overlay.classList.add("mnu-visible"),this.syncPauseButton(),i.focus({preventScroll:!0})}syncPauseButton(){this.pauseButton.hidden=!this.pauseVisible||this.open}modeButton(e,t){const i=Yt(e,`mnu-choice mnu-${t}`,"",()=>this.select(t)),{name:[s,a],hint:[r,o]}=uc[t];return tt("span",i,"mnu-mode-name").textContent=this.L(s,a),i.append(hc(t,t)),tt("span",i,"mnu-mode-hint").textContent=this.L(r,o),tt("span",i,"mnu-check").append(Bn("check")),i}select(e){this.difficulty=e;for(const t of Bv)this.modes[t].setAttribute("aria-pressed",String(t===e))}setLeaderboard(e){this.boardButton.hidden=!e}setMap(e,t=!1){this.map=e;const i=e==="hills"?this.L("Холмы","Hills"):this.L("Пирамида","Pyramid");this.mapButton.replaceChildren(Bn(e)),this.mapButton.setAttribute("aria-label",this.L(`Карта: ${i}. Сменить`,`Map: ${i}. Change`)),this.mapTip.textContent=this.L(`Карта: ${i}`,`Map: ${i}`),t&&(this.mapTip.classList.remove("show"),this.mapTip.offsetWidth,this.mapTip.classList.add("show"),window.clearTimeout(this.mapTipTimer),this.mapTipTimer=window.setTimeout(()=>this.mapTip.classList.remove("show"),1800))}soundButton(e){const t=Yt(e,"mnu-sound","",()=>{this.setMuted(!this.muted),this.onMute?.(this.muted)});this.soundButtons.push(t)}setMuted(e){this.muted=e;for(const t of this.soundButtons)t.setAttribute("aria-label",this.L("Звук выключен","Sound muted")),t.setAttribute("aria-pressed",String(e)),t.replaceChildren(hc(e?"mute":"sound",e?"muted":"sound"))}showReward(e){this.rewardAmount.textContent=this.L(`+${e}`,`+${e}`)}countReward(e){if(window.clearInterval(this.rewardTimer),this.reward=e,this.rewardAmount.getAnimations().forEach(i=>i.cancel()),!e||matchMedia("(prefers-reduced-motion: reduce)").matches){this.showReward(e);return}this.showReward(0);const t=performance.now();this.rewardTimer=window.setInterval(()=>{const i=Math.min(1,(performance.now()-t)/600);this.showReward(Math.floor(e*i)),i===1&&window.clearInterval(this.rewardTimer)},24)}setDoubleWaiting(e){this.doubleButton.disabled=e,this.doubleButton.setAttribute("aria-busy",String(e)),this.doubleButton.setAttribute("aria-label",e?this.L("Ждём рекламный ролик","Waiting for the ad"):this.L("Удвоить монеты за ролик","Watch an ad to double your coins"))}async doubleReward(){if(this.screen!=="result"||this.doubleButton.hidden||this.doubleButton.disabled||!this.onDouble)return;const e=this.resultVersion;this.setDoubleWaiting(!0);let t=!1;try{t=await this.onDouble()}catch{}e!==this.resultVersion||this.screen!=="result"||(this.setDoubleWaiting(!1),t&&(window.clearInterval(this.rewardTimer),this.showReward(this.reward*2),this.bounce(this.rewardAmount),this.doubleButton.hidden=!0))}async revive(){if(this.screen!=="result"||this.reviveButton.hidden||this.reviveButton.disabled||!this.onRevive)return;this.reviveButton.disabled=!0;let e=!1;try{e=await this.onRevive()}catch{}e||(this.reviveButton.disabled=!1)}bounce(e){matchMedia("(prefers-reduced-motion: reduce)").matches||(e.getAnimations().forEach(t=>t.cancel()),e.animate([{transform:"translateY(0) scale(1)"},{transform:"translateY(-.28em) scale(1.18)",offset:.42},{transform:"translateY(0) scale(1)"}],{duration:380,easing:"ease-out"}))}handleKey(e){if(e.defaultPrevented||e.isComposing||e.altKey||e.ctrlKey||e.metaKey)return;const{key:t}=e;if(t==="Tab"&&this.screen){this.wrapFocus(e,this.screens[this.screen]);return}let i;if(e.code==="KeyP")this.screen==="pause"&&(i=this.resumeButton),!this.open&&this.pauseVisible&&(i=this.pauseButton);else if(t==="Enter"||t===" "){if(!this.screen)return;const s=document.activeElement;if(s instanceof HTMLButtonElement&&s.matches(":focus-visible")&&this.screens[this.screen].contains(s)){e.stopPropagation(),e.repeat&&e.preventDefault();return}this.screen==="main"&&(i=this.playButton),this.screen==="result"&&t==="Enter"&&(i=this.retryButton)}i&&(e.preventDefault(),e.stopPropagation(),e.repeat||i.click())}wrapFocus(e,t){const i=t.querySelectorAll("button:not(:disabled)"),s=document.activeElement,a=i[0],r=i[i.length-1];(e.shiftKey?s===a||s===t:s===r)&&(e.preventDefault(),(e.shiftKey?r:a)?.focus())}}function tt(n,e,t){const i=document.createElement(n);return i.className=t,e.append(i),i}function Yt(n,e,t,i){const s=tt("button",n,`mnu-button ${e}`);return s.type="button",s.textContent=t,s.addEventListener("click",a=>{a.detail>0&&document.activeElement===s&&s.closest(".mnu-panel")?.focus({preventScroll:!0}),i()}),s}function Bn(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false"),e.innerHTML=Gv[n],e}function hc(n,e){const t=document.createElement("span");t.className="mnu-art",t.setAttribute("aria-hidden","true");const i=t.appendChild(Bn(e));return _l(t,`icons/${n}`,i),t}function _l(n,e,t){ka(n,`ui/${e}`,t)}let pc=!1;function zv(){if(pc)return;pc=!0;const n=document.createElement("style");n.textContent=`
.mnu-overlay,.mnu-corner {
  --u:min(1vh,8px); --u:min(1dvh,8px);
  --ink:#2a1250; --line:clamp(3px,calc(.68 * var(--u)),6px);
  --depth:clamp(4px,calc(.95 * var(--u)),8px);
  --min-font:max(13px,13px); --tap:48px;
  font:900 clamp(var(--min-font),calc(2.6 * var(--u)),22px)/1.12 Nunito,"Arial Black",system-ui,sans-serif;
  box-sizing:border-box;
}
.mnu-overlay {
  position:absolute; inset:0; z-index:21; display:grid; grid-template:minmax(0,1fr)/minmax(0,1fr); place-items:center;
  padding:calc(env(safe-area-inset-top) + 10px) calc(env(safe-area-inset-right) + 12px)
    calc(env(safe-area-inset-bottom) + 16px) calc(env(safe-area-inset-left) + 12px);
  background:radial-gradient(ellipse at 50% 47%,transparent 25%,#1e12503b 100%);
  opacity:0; visibility:hidden; pointer-events:none;
  transition:opacity .18s ease-in,visibility 0s .18s;
}
.mnu-overlay:has(.mnu-card:not([hidden])) { background:radial-gradient(ellipse,#25134732,#190f4366); }
.mnu-overlay * { box-sizing:border-box; }
.mnu-overlay [hidden],.mnu-corner[hidden] { display:none; }
.mnu-overlay.mnu-visible { opacity:1; visibility:visible; pointer-events:auto; transition:opacity .16s ease-out; }
.mnu-panel { min-width:0; max-width:100%; text-align:center; }
.mnu-panel:focus { outline:none; }
.mnu-visible .mnu-panel { animation:mnu-pop .3s cubic-bezier(.2,.7,.35,1) both; }
@keyframes mnu-pop { 0% { transform:scale(.94); } 72% { transform:scale(1.015); } 100% { transform:scale(1); } }
.mnu-panel h1,.mnu-panel h2,.mnu-panel p { margin:0; }
.mnu-panel h1,.mnu-panel h2 { font-weight:900; }
.mnu-main {
  width:min(100%,calc(107 * var(--u)),840px); height:94%; display:grid; justify-items:center;
  grid-template-rows:auto auto minmax(0,1fr) auto auto; row-gap:clamp(9px,calc(2 * var(--u)),17px);
  color:#fff;
}
.mnu-main::before { content:''; grid-row:3; }
.mnu-logo {
  /* 42vh — на коротком экране (телефон с адресной строкой) логотип уступает место кнопкам */
  width:min(81%,calc(55 * var(--u)),460px,42vh); aspect-ratio:3/2; display:grid; place-items:center;
  font-size:clamp(30px,min(calc(12.8 * var(--u)),13vw),105px); line-height:.88;
  text-align:center; white-space:nowrap;
  -webkit-text-stroke:clamp(5px,calc(1.4 * var(--u)),12px) #36104f;
  paint-order:stroke fill; text-shadow:0 calc(1.25 * var(--u)) #36104f;
}
.mnu-logo img { width:100%; height:100%; object-fit:contain; }
.mnu-logo span { display:block; }
.mnu-logo-top { color:#ffdb44; }
.mnu-logo-bottom { color:#ff5195; }
.mnu-visible .mnu-logo { animation:mnu-sway 4s ease-in-out infinite; }
@keyframes mnu-sway { 0%,100% { transform:rotate(-2deg); } 50% { transform:translateY(-3px) rotate(1deg) scale(1.02); } }
.mnu-choices {
  width:100%; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); container-type:inline-size;
  gap:clamp(7px,calc(2.1 * var(--u)),18px); margin-top:clamp(5px,var(--u),8px);
}
.mnu-button {
  --shine:linear-gradient(#ffffffbd,#ffffff24);
  --light:#ff438b; --dark:#e0186a; --base:#861344;
  position:relative; isolation:isolate; min-width:var(--tap); min-height:var(--tap);
  padding:clamp(5px,calc(1.2 * var(--u)),11px) clamp(7px,calc(2.1 * var(--u)),17px);
  display:inline-flex; align-items:center; justify-content:center; gap:.35em;
  background:linear-gradient(var(--light),var(--dark) 72%);
  border:var(--line) solid var(--ink); border-radius:clamp(15px,calc(3.8 * var(--u)),32px);
  box-shadow:inset 0 2px 0 #ffffffa8,inset 0 -3px 0 #2d06382e,0 var(--depth) 0 var(--base),0 calc(var(--depth) + 2px) 0 var(--ink);
  color:#fff; font:inherit; text-align:center; cursor:pointer; touch-action:manipulation;
  -webkit-text-stroke:clamp(2px,calc(.52 * var(--u)),4px) var(--ink);
  paint-order:stroke fill; text-shadow:0 2px var(--ink);
  transition:translate .12s,transform .18s,box-shadow .12s;
}
.mnu-button::before {
  content:''; position:absolute; z-index:-1; pointer-events:none; inset:3px 7% auto;
  height:34%; border-radius:inherit; background:var(--shine); opacity:.75;
}
/* зона нажатия = кнопка вместе с нарисованной «толщиной» снизу и полями вокруг: на телефоне палец попадает в низ кнопки */
.mnu-button::after { content:''; position:absolute; inset:-5px -5px calc(-1 * var(--depth) - 9px); border-radius:inherit; }
.mnu-button:focus-visible { outline:3px solid #fff; outline-offset:3px; }
.mnu-button:active {
  translate:0 calc(var(--depth) * .7);
  box-shadow:inset 0 2px 0 #ffffffa8,inset 0 -3px 0 #2d06382e,0 2px var(--base),0 4px var(--ink);
}
.mnu-button svg,.mnu-art { width:clamp(25px,calc(5.7 * var(--u)),49px); flex:none; pointer-events:none; }
.mnu-art { display:grid; place-items:center; aspect-ratio:1; }
.mnu-art img,.mnu-art svg { display:block; width:100%; height:100%; object-fit:contain; }
.mnu-art svg { filter:drop-shadow(0 2px 0 #2a1250); }
.mnu-easy { --light:#67ed4e; --dark:#2fae2a; --base:#1b651d; }
.mnu-normal,.mnu-secondary { --light:#ffdf55; --dark:#ff9d14; --base:#a95210; }
.mnu-chaos,.mnu-sound { --light:#ab66ff; --dark:#722ee8; --base:#421485; }
.mnu-blue { --light:#49d6ff; --dark:#1580e8; --base:#103e8c; --ink:#14204a; }
.mnu-choice {
  min-width:0; min-height:clamp(96px,calc(18 * var(--u)),150px); flex-direction:column; justify-content:center;
  padding-inline:3px; gap:clamp(2px,calc(.65 * var(--u)),5px);
  background:radial-gradient(ellipse at 50% 83%,#ffffff41,transparent 57%),linear-gradient(var(--light),var(--dark) 80%);
  transform:scale(.95); filter:brightness(.93);
}
.mnu-choice[aria-pressed="true"] {
  transform:translateY(-4px) scale(1.015); filter:none; z-index:1;
  border-color:#683110;
  box-shadow:inset 0 2px 0 #fff9c9,inset 0 -3px 0 #98400a3b,0 4px #b8540f,0 0 0 3px #ffe080,0 3px 13px 4px #ffdb53b8;
}
.mnu-choice[aria-pressed="true"]:active { translate:0 3px; }
.mnu-choice > .mnu-art { width:clamp(32px,min(14cqi,calc(8 * var(--u))),65px); }
.mnu-mode-name { font-size:clamp(11px,min(4.6cqi,calc(4.2 * var(--u))),36px); line-height:1; text-transform:uppercase; white-space:nowrap; }
.mnu-mode-hint {
  font-size:clamp(12px,min(3.4cqi,calc(2.2 * var(--u))),19px);
  line-height:1.05; -webkit-text-stroke:2px var(--ink); text-shadow:0 1px var(--ink);
}
.mnu-check {
  display:none; position:absolute; top:0; right:0; transform:translate(30%,-35%);   /* в углу, а не по центру — закрывала название сложности */
  width:clamp(22px,calc(4.4 * var(--u)),40px); aspect-ratio:1; place-items:center;
  border:2px solid #174d17; border-radius:50%; color:#fff;
  background:linear-gradient(#9bf94d,#2fc827 65%,#179516); box-shadow:inset 0 2px #ecffb9,0 2px #173d18;
}
.mnu-check svg { width:72%; filter:drop-shadow(0 1px 0 #174d17); }
.mnu-choice[aria-pressed="true"] .mnu-check { display:grid; }
.mnu-play-slot { grid-row:4; position:relative; width:min(72%,calc(65 * var(--u)),525px); }
.mnu-play-slot::before,.mnu-play-slot::after {
  content:''; position:absolute; top:22%; height:63%; width:clamp(17px,calc(5 * var(--u)),43px);
  background:linear-gradient(#fff6a2,#ffd638 47%,#ec8808);
  clip-path:polygon(19% 0,100% 38%,5% 30%,0 19%,19% 0,0 66%,100% 55%,29% 96%,14% 100%,0 82%,0 66%);
  pointer-events:none;
}
.mnu-play-slot::before { right:calc(100% + 7px); }
.mnu-play-slot::after { left:calc(100% + 7px); transform:scaleX(-1); }
.mnu-primary { font-size:clamp(17px,calc(4.6 * var(--u)),37px); }
.mnu-panel .mnu-play {
  width:100%; min-height:clamp(55px,calc(13 * var(--u)),105px); border-radius:999px;
  font-size:clamp(27px,calc(8.1 * var(--u)),65px); -webkit-text-stroke:clamp(4px,calc(.95 * var(--u)),8px) #4b0c32;
  text-shadow:0 clamp(3px,calc(.8 * var(--u)),7px) #4b0c32;
}
.mnu-visible .mnu-play:not(:active) { animation:mnu-pulse 2.4s ease-in-out infinite; }
@keyframes mnu-pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.04); } }
.mnu-secondary { color:#542808; -webkit-text-stroke:0; text-shadow:0 1px #ffefac; }
.mnu-tools { grid-row:5; display:flex; align-items:center; justify-content:center; gap:clamp(12px,calc(2.6 * var(--u)),22px); }
.mnu-characters,.mnu-sound,.mnu-corner {
  width:clamp(var(--tap),calc(9 * var(--u)),74px); height:clamp(var(--tap),calc(9 * var(--u)),74px); padding:0;
}
.mnu-characters .mnu-art { width:78%; }
.mnu-map svg { width:70%; height:auto; filter:drop-shadow(0 2px 0 #14204a); }
.mnu-tools { position:relative; }
/* 5 круглых кнопок в ряд: на узком вертикальном телефоне ужимаем, чтобы последняя не уходила за край */
@media (orientation:portrait) { .mnu-tools { gap:min(clamp(12px,calc(2.6 * var(--u)),22px),2.6vw); }
  .mnu-tools > .mnu-characters,.mnu-tools > .mnu-sound { width:min(clamp(var(--tap),calc(9 * var(--u)),74px),15.5vw); height:min(clamp(var(--tap),calc(9 * var(--u)),74px),15.5vw); } }
.mnu-map-tip { position:absolute; left:50%; bottom:calc(100% + 8px); translate:-50% 0; padding:.25em .8em; border-radius:999px; white-space:nowrap;
  background:#2a1250; color:#fff; -webkit-text-stroke:0; text-shadow:none; font-size:clamp(14px,calc(2.6 * var(--u)),20px);
  opacity:0; transition:opacity .2s; pointer-events:none; }
.mnu-map-tip.show { opacity:1; }
.mnu-board svg { width:66%; }
.mnu-board[hidden] { display:none; }
.mnu-book svg { width:58%; height:auto; color:#fff; filter:drop-shadow(0 2px 0 #14204a); }
.mnu-main-wallet {
  position:absolute; top:calc(env(safe-area-inset-top) + 10px); left:calc(env(safe-area-inset-left) + 12px);
}
.mnu-overlay:not(:has(.mnu-main:not([hidden]))) > .mnu-main-wallet { display:none; }
:has(> .chr-overlay.chr-visible) > .mnu-overlay > :is(.mnu-panel,.mnu-main-wallet) { visibility:hidden; }
.mnu-corner {
  position:absolute; z-index:20; top:calc(env(safe-area-inset-top) + max(8px,2.2 * var(--u)));
  right:calc(env(safe-area-inset-right) + max(8px,2.2 * var(--u))); border-radius:50%;
  /* пауза — второстепенная: не крупнее сердечек (на телефоне была 88 px и лезла в глаза) */
  width:clamp(44px,calc(7 * var(--u)),60px); height:clamp(44px,calc(7 * var(--u)),60px);
}
.mnu-card {
  position:relative; width:min(100%,calc(90 * var(--u)),690px); display:grid; justify-items:center;
  gap:clamp(7px,calc(1.65 * var(--u)),14px);
  padding:0 clamp(12px,calc(3.5 * var(--u)),28px) clamp(14px,calc(3.6 * var(--u)),29px);
  border:var(--line) solid var(--ink); border-radius:clamp(22px,calc(5 * var(--u)),42px);
  background:linear-gradient(#fff9e8,#ede6ff 70%,#d7cbff); color:#fff;
  -webkit-text-stroke:clamp(2px,calc(.4 * var(--u)),3px) var(--ink);
  paint-order:stroke fill; text-shadow:0 1px var(--ink);
  box-shadow:inset 0 0 0 3px #fff9,0 var(--depth) #6546a7,0 calc(var(--depth) + 3px) var(--ink);
}
/* Лента занимает строку, чтобы длинный заголовок не перекрыл статистику. */
.mnu-panel h2 {
  margin:calc(-3 * var(--u)) 0 0; max-width:100%; padding:.23em .55em .3em;
  border:var(--line) solid var(--ink); border-radius:clamp(13px,calc(3 * var(--u)),25px);
  background:linear-gradient(#ff9dc8,#ff4b90 33%,#de1664); color:#fff;
  box-shadow:inset 0 2px #ffffffad,0 4px #831445;
  font-size:clamp(24px,min(8.2vw,calc(6.6 * var(--u))),54px); line-height:1.02;
  -webkit-text-stroke:clamp(3px,calc(.68 * var(--u)),6px) var(--ink);
  paint-order:stroke fill; text-shadow:0 3px var(--ink);
}
.mnu-win .mnu-result-title { background:linear-gradient(#9eee63,#40be42 60%,#259844); box-shadow:inset 0 2px #ffffffad,0 4px #246139; }
.mnu-panel .mnu-pause-title { background:linear-gradient(#cd9bff,#a35bff 38%,#6a2fe0); box-shadow:inset 0 2px #ffffffad,0 4px #421485; }
.mnu-cause { -webkit-text-stroke-color:#712650; text-shadow:0 1px #712650; }
.mnu-stats { display:grid; width:100%; min-width:0; justify-items:center; gap:clamp(4px,var(--u),8px);
  color:var(--ink); -webkit-text-stroke:0; text-shadow:none; }   /* тёмным по светлому: белый с обводкой на кремовой карточке читался плохо */
/* строки итога не рвём посреди фразы: в узком портрете чуть мельче (было «из 60 / с») */
.mnu-stats > * { overflow-wrap:normal; }
@media (orientation:portrait) and (max-width:480px) { .mnu-stats { font-size:15px; } .mnu-result { padding-inline:10px; } }
.mnu-progress {
  width:100%; height:clamp(12px,calc(2.7 * var(--u)),22px); overflow:hidden;
  background:#c6b7eb; border:2px solid var(--ink); border-radius:999px; box-shadow:inset 0 2px #2a125033;
}
.mnu-fill {
  height:100%; border-radius:inherit; transform-origin:left; transform:scaleX(var(--mnu-progress,0));
  background:linear-gradient(#fff286,#ffab21);
}
.mnu-win .mnu-fill { background:linear-gradient(#b1f785,#36b759); }
.mnu-visible .mnu-celebrate .mnu-fill { animation:mnu-fill .6s ease-out both; }
@keyframes mnu-fill { from { transform:scaleX(0); } }
.mnu-bots { display:flex; flex-wrap:wrap; justify-content:center; gap:4px; color:#897ba5; }
.mnu-bots svg { width:clamp(14px,calc(4 * var(--u)),30px); height:auto; }
.mnu-bots .mnu-alive { color:#247b45; }
.mnu-best-row { display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:.4em; }
.mnu-rewards {
  display:flex; align-items:center; justify-content:center; flex-wrap:wrap; column-gap:.65em; row-gap:5px;
  width:100%; font-variant-numeric:tabular-nums;
}
.mnu-earned { display:flex; align-items:center; justify-content:center; gap:.16em; font-size:clamp(18px,calc(4 * var(--u)),32px); }
.mnu-earned-amount { min-width:3ch; text-align:right; }
.mnu-double {
  --tap:44px; --line:clamp(2px,calc(.48 * var(--u)),4px); --depth:3px;
  padding:3px .65em; white-space:nowrap;
}
.mnu-double[aria-busy="true"] { opacity:.65; cursor:wait; }
.mnu-revive { --tap:52px; width:min(100%,420px); gap:.4em; font-size:clamp(20px,calc(5 * var(--u)),36px); animation:mnu-revive 1.1s ease-in-out infinite; }
.mnu-revive:disabled { opacity:.6; animation:none; }
@keyframes mnu-revive { 50% { transform:scale(1.05); } }
.mnu-double[aria-busy="true"] .chr-icon { animation:chr-wait .7s ease-in-out infinite alternate; }
.mnu-badge,.mnu-record {
  border:2px solid var(--ink); border-radius:999px; padding:.2em .65em;
  color:#fff; background:linear-gradient(var(--light),var(--dark)); box-shadow:inset 0 1px #ffffffa8;
  -webkit-text-stroke:2px var(--ink); paint-order:stroke fill; text-shadow:0 1px var(--ink);
}
.mnu-record { background:linear-gradient(#fff088,#ffb62b); -webkit-text-stroke-color:#542808; text-shadow:0 1px #542808; }
.mnu-visible .mnu-celebrate .mnu-record { animation:mnu-record .38s cubic-bezier(.2,.8,.4,1.35) both; }
@keyframes mnu-record { from { transform:rotate(-9deg) scale(.65); opacity:0; } }
.mnu-actions { display:grid; grid-template-columns:minmax(var(--tap),1.45fr) minmax(var(--tap),1fr); width:100%; gap:clamp(8px,calc(1.7 * var(--u)),14px); }
.mnu-actions > .mnu-button { min-width:0; }
.mnu-actions > .mnu-primary { font-size:clamp(17px,min(5.9vw,calc(4.6 * var(--u))),37px); }
.mnu-pause .mnu-actions { grid-template-columns:repeat(2,minmax(var(--tap),1fr)); }
.mnu-resume { width:100%; }
.mnu-pause > .mnu-sound { margin-top:5px; }
@media (max-width:420px), (max-height:430px) {
  .mnu-choice:not([aria-pressed="true"]) .mnu-mode-hint { display:none; }
}
@media (orientation:portrait) and (max-width:550px) {
  .mnu-main { padding-top:36px; }
  /* низ вертикального экрана перехватывают жест «домой» и панель браузера — нижний ряд кнопок поднимаем */
  .mnu-overlay { padding-bottom:calc(env(safe-area-inset-bottom) + max(16px, 7dvh)); }
}
@media (max-height:430px) {
  /* Компактный логотип оставляет место для целей нажатия в альбоме. */
  .mnu-main { height:100%; row-gap:7px; width:min(100%,460px); }
  .mnu-logo { width:clamp(105px,38vh,147px); font-size:clamp(26px,9.7vh,38px); }
  .mnu-choice { min-height:88px; }
  .mnu-panel .mnu-play { min-height:var(--tap); padding-block:3px; }
  .mnu-card { gap:6px; }
  .mnu-result { width:min(100%,450px); }
}
@media (prefers-reduced-motion:reduce) {
  .mnu-overlay,.mnu-overlay.mnu-visible,.mnu-button { transition:none; }
  .mnu-visible .mnu-panel,.mnu-visible .mnu-logo,.mnu-visible .mnu-play:not(:active),
  .mnu-visible .mnu-celebrate .mnu-fill,.mnu-visible .mnu-celebrate .mnu-record,
  .mnu-double[aria-busy="true"] .chr-icon { animation:none; }
}
`,document.head.append(n)}const it=30,Vv=-12,Wv=1,_a={x:0,z:5},gs=5,Xv=3,Kv={easy:{hearts:4,runners:.6,speed:.8,lava:1.4,meteors:[7,8],aim:.2,storm:10,chase:10,roam:.2},normal:{hearts:3,runners:1.25,speed:1,lava:1,meteors:[8,9],aim:.28,storm:8,chase:14,roam:.65},chaos:{hearts:2,runners:1.5,speed:1.15,lava:.85,meteors:[12,13],aim:.36,storm:6,chase:17,roam:.8}},jv=1.6,Rn=60,Yv=1.5,mc=[0,15,30],xa=[{at:44,top:.45,sec:5,ru:"ЛАВА ПОДНИМАЕТСЯ!",en:"LAVA IS RISING!"},{at:50,top:1.5,sec:4,ru:"ЛАВА ВЫШЕ!",en:"LAVA RISES HIGHER!"},{at:55,top:2.5,sec:4,ru:"НА САМЫЙ ВЕРХ!",en:"GET TO THE TOP!"}],gc=n=>n===0?{n:vs([3,5]),adj:vs(yi),noun:vs(Ai.filter(e=>e!=="ufo"&&e!=="tornado"&&e!=="dino"))}:{},vs=n=>n[Math.floor(Math.random()*n.length)],$v={fire:"#ff8a2a",ice:"#9be3ff",giant:"#ffd23a",bouncy:"#ff8ae0",fast:"#fff36b",plain:"#ffffff"},qv=.35,Zv={steam:["ПАР! ЛЁД ТУШИТ ОГОНЬ","STEAM! ICE BEATS FIRE","#e8f6ff"],melt:["ЛЁД ТАЕТ — ЛУЖА!","ICE MELTS — PUDDLE!","#9be3ff"],shock:["ЭЛЕКТРОЛУЖА!","SHOCK PUDDLE!","#fff36b"],slimeFire:["ГОРЯЩАЯ СЛИЗЬ!","BURNING SLIME!","#ff8a2a"],catchFire:["ЗАГОРЕЛСЯ!","CAUGHT FIRE!","#ff8a2a"],douse:["ПОТУХ!","FIRE OUT!","#cfefff"],snowMelt:["СНЕГОВИК РАСТАЯЛ!","SNOWMAN MELTED!","#9be3ff"],fireTornado:["ОГНЕННЫЙ СМЕРЧ!","FIRE TORNADO!","#ff6a1a"],iceTornado:["ЛЕДЯНОЙ СМЕРЧ!","ICE TORNADO!","#9be3ff"],skate:["КАТОК! ИХ ЗАНОСИТ","ICE RINK! THEY SLIDE","#cfefff"],blast:["РАЗЛЕТЕЛИСЬ!","BLASTED AWAY!","#ffd23a"],stun:["УДАРИЛО ТОКОМ!","ZAPPED!","#fff36b"],storm:["ГРОЗА! НЕ СТОЙ НА МЕСТЕ","STORM! KEEP MOVING","#fff36b"]},Jv=.5,Qv=.3,_e={grass:6079562,dirt:10119740,stone:10725811,stoneDark:8225936,crate:12878911,trunk:9067059,leaves:4173391,flag:15220794,fence:16774364,post:14260814,sand:15123580,sandRock:13212248,pyr:14726510,pyrDark:13079631,ruin:14069100,adobe:15254922,palmTrunk:11041354,palm:6012732,cactus:5219914,pot:13132860,potRim:14715474,cloth:3112920},e_={hills:[3114736,14478591],pyramid:[4165600,16769197]};function i_(n){const e=p0(n,{...Qc,cloudSea:!0}),{renderer:t,scene:i}=e,s=new O0,a=new U0(n),r=new H0,o=new z0(n,()=>{const C=t.info.render;return`DC ${C.calls} · ${(C.triangles/1e3).toFixed(0)}k △ · ${bn.preset.name} ×${t.getPixelRatio().toFixed(2)}`});r.add({box:new ti(new he(-it,-2,-it),new he(it,0,it))});{const C=it-.35;for(const X of[0,1,2,3]){const se=X<2,ce=X%2?-C:C,p=new he(se?-it:ce-.25,0,se?ce-.25:-it),A=new he(se?it:ce+.25,Wv,se?ce+.25:it);r.add({box:new ti(p,A),kind:"fence"})}}const c=C=>{const X=new un;i.add(X);const se=[],ce=(k,D,U,z,ne,ee,re)=>{const j=es({x:k,y:D,z:U},re);j.position.set(z,ne+D/2,ee),X.add(j),se.push(j)};ce(it*2,2,it*2,0,-2,0,C?_e.sand:_e.grass),ce(it*2-1,5,it*2-1,0,-7,0,C?_e.sandRock:_e.dirt),ce(it*2-8,4,it*2-8,0,-11,0,C?_e.sandRock:_e.dirt),ce(it-4,4,it-4,2,-15,-1,_e.stoneDark);const p=it-.35,A=it*2-.7;for(const k of[0,1,2,3]){const D=k<2,U=k%2?-p:p;if(C){ce(D?A:.4,.6,D?.4:A,D?0:U,0,D?U:0,_e.adobe);for(let z=-it+1;z<=it-1;z+=6)ce(.7,1.05,.7,D?z:U,0,D?U:z,_e.sandRock),ce(.9,.2,.9,D?z:U,1.05,D?U:z,_e.adobe)}else{ce(D?A:.16,.16,D?.16:A,D?0:U,.32,D?U:0,_e.fence),ce(D?A:.16,.16,D?.16:A,D?0:U,.78,D?U:0,_e.fence);for(let z=-it+1;z<=it-1;z+=3)ce(.3,1.1,.3,D?z:U,0,D?U:z,_e.post)}}if(C){const k=[[-95,-120,34,.55],[70,-135,46,.2],[150,-40,30,-.3],[-150,30,38,.9]];for(const[D,U,z,ne]of k){const ee=z/5,re=-24+ne;for(let j=0;j<5;j++)ce(z-j*ee,ee*.9,z-j*ee,D,re+j*ee*.9+18,U,j===4?_e.pyrDark:_e.pyr)}for(const[D,U]of[[-60,85],[95,70]]){ce(14,3,14,D,-4,U,_e.sand),ce(11,6,11,D,-10,U,_e.sandRock);for(let z=0;z<4;z++)ce(.8,1,.8,D+z*.25,-1+z,U,_e.palmTrunk);ce(4,.4,4,D+1,3,U,_e.palm)}}return po(X,se,!0),X},l={hills:c(!1),pyramid:c(!0)};let d=ct.snapshot().map==="pyramid"?"pyramid":"hills";const h=new un;i.add(h);let u=[],v=[];const b=()=>{for(const z of u)r.remove(z);u=[];for(const z of[...h.children])z.geometry.dispose(),z.removeFromParent();const C=Math.floor(Math.random()*4),X=Math.random()<.5,se=(z,ne)=>{let ee=X?-z:z,re=ne;for(let j=0;j<C;j++)[ee,re]=[-re,ee];return[ee,re]},ce=[],p=(z,ne,ee,re,j,Te,Ie,ye=!0,Xe=!1)=>{const[Ke,Qe]=Xe?[re,Te]:se(re,Te),Ze=!Xe&&C%2===1,bt=es({x:Ze?ee:z,y:ne,z:Ze?z:ee},Ie);bt.position.set(Ke,j+ne/2,Qe),h.add(bt),Ie===_e.crate&&(bt.userData.ownUV=!0),ye&&u.push(r.addMesh(bt,ye==="leaf"?"leaf":void 0)),ce.push(bt)},A=(z,ne,ee,re,j,Te,Ie,ye,Xe)=>{const Ke=es({x:z,y:ne,z:ee},Ie);Ke.rotation.order="YZX",Ke.rotation.set(0,ye,-Xe),Ke.position.set(re,j,Te),h.add(Ke),ce.push(Ke)},k=d==="pyramid";if(l.hills.visible=!k,l.pyramid.visible=k,e.setSky(...e_[d]),d==="pyramid"){p(16,1,16,0,0,-12,_e.sand),p(12,2,12,0,0,-12,_e.sand),p(8,3,8,0,0,-12,_e.sand),p(4,4,4,0,0,-12,_e.pyrDark),v=[[0,-5],[0,-7],[0,-9],[0,-12]].map(([z,ne])=>se(z,ne));for(const z of[-1,1])p(5,2,5,20*z,0,18,_e.sand),p(2,1,2,20*z,0,14.5,_e.pyrDark),p(9,1,1,13*z,0,3,_e.pyrDark);p(5,6,5,20,0,-20,_e.sand);for(let z=0;z<5;z++)p(2,z+1,2,20,0,-8.5-z*2,_e.pyrDark);p(.3,3,.3,21.8,6,-21.8,_e.palmTrunk,!1),p(1.8,1.1,.2,22.8,7.7,-21.8,_e.cloth,!1)}else{p(16,1,14,-16,0,-13,_e.stone),p(10,2,9,-18,0,-15,_e.stone),p(5,3,5,-21,0,-18,_e.stone),v=[[-16,-9],[-18,-14],[-21,-18]].map(([z,ne])=>se(z,ne)),p(6,2,6,-6,0,20,_e.stone),p(2,1,2,-10,0,20,_e.stoneDark),p(8,1,6,14,0,-2,_e.stoneDark),p(5,6,5,20,0,-20,_e.stone);for(let z=0;z<5;z++)p(2,z+1,2,8.5+z*2,0,-19,_e.stoneDark);p(.3,3,.3,21.8,6,-21.8,_e.trunk,!1),p(1.8,1.1,.2,22.8,7.7,-21.8,_e.flag,!1)}const D=(z,ne,ee)=>{if(Math.abs(z)>it-3-ee||Math.abs(ne)>it-3-ee||Math.hypot(z-_a.x,ne-_a.z)<4+ee)return!1;for(const re of u){const j=re.box,Te=1.2;if(z+ee>j.min.x-Te&&z-ee<j.max.x+Te&&ne+ee>j.min.z-Te&&ne-ee<j.max.z+Te)return!1}return!0},U=z=>{for(let ne=0;ne<300;ne++){const ee=(Math.random()*2-1)*(it-3),re=(Math.random()*2-1)*(it-3);if(D(ee,re,z))return[ee,re]}return null};if(k){const z=[...Array(3).fill([[0,0,0],[2,0,0],[1,2,0]]),...Array(3).fill([[0,0,0],[2,0,0]])];for(const re of z){const j=U(2.2);if(!j)continue;const Te=Math.random()<.5;for(const[Ie,ye,Xe]of re)p(2,2,2,j[0]+(Te?Ie-1:Xe),ye,j[1]+(Te?Xe:Ie-1),_e.ruin,!0,!0)}for(let re=0;re<3;re++){const j=U(1.1);if(!j)continue;const Te=re===0?3.2:1.4+Math.random()*.8;p(1.7,.4,1.7,j[0],0,j[1],_e.pyrDark,!0,!0),p(1.1,Te,1.1,j[0],.4,j[1],_e.ruin,!0,!0),re===0&&p(1.6,.35,1.6,j[0],.4+Te,j[1],_e.pyrDark,!0,!0)}for(let re=0;re<2;re++){const j=U(1);j&&(p(1.5,.5,1.5,j[0],0,j[1],_e.pyrDark,!0,!0),p(1.1,4.4,1.1,j[0],.5,j[1],_e.pyr,!0,!0),p(.7,.7,.7,j[0],4.9,j[1],_e.cloth,!0,!0))}for(let re=0;re<5;re++){const j=U(.7);j&&(p(.9,.75,.9,j[0],0,j[1],_e.pot,!0,!0),p(.55,.3,.55,j[0],.75,j[1],_e.pot,!1,!0),p(.75,.12,.75,j[0],1.05,j[1],_e.potRim,!1,!0))}const ne=4,ee=Array.from({length:ne},(re,j)=>.08+j*.07).reduce((re,j)=>re+j,0);for(let re=0;re<5;re++){let j=null,Te=0,Ie=null;for(let st=0;st<12&&!Ie&&(j=U(1.4),!!j);st++){Te=Math.random()*Math.PI*2;const He=j[0]+Math.cos(Te)*ee,Ct=j[1]+Math.sin(Te)*ee;for(const Vt of[0,.7,-.7,1.4,-1.4]){const nn=He+Math.cos(Te+Vt)*3.4,dn=Ct+Math.sin(Te+Vt)*3.4;if(D(nn,dn,1)){Ie=[nn,dn];break}}}if(!j||!Ie)continue;p(2,2,2,Ie[0],0,Ie[1],_e.ruin,!0,!0);const ye=Math.cos(Te),Xe=Math.sin(Te);let Ke=j[0],Qe=j[1];for(let st=0;st<ne;st++){const He=.78-st*.05;p(He,.95,He,Ke,st*.95,Qe,_e.palmTrunk,!0,!0);const Ct=.08+st*.07;Ke+=ye*Ct,Qe+=Xe*Ct}const Ze=ne*.95;u.push(r.add({box:new ti(new he(Ke-1.9,Ze-.2,Qe-1.9),new he(Ke+1.9,Ze+.35,Qe+1.9)),kind:"leaf"})),p(1.1,.7,1.1,Ke,Ze-.1,Qe,_e.palm,!1,!0);const bt=7,we=Math.random()*Math.PI;for(let st=0;st<bt;st++){const He=we+st/bt*Math.PI*2,Ct=3.1,Vt=.32+st%2*.16,nn=Ke+Math.cos(He)*Ct*.46,dn=Qe-Math.sin(He)*Ct*.46;A(Ct,.16,.95,nn,Ze+.35-Math.sin(Vt)*Ct*.46,dn,_e.palm,He,Vt)}for(let st=0;st<3;st++){const He=we+st*2.1;p(.36,.36,.36,Ke+Math.cos(He)*.45,Ze-.35,Qe+Math.sin(He)*.45,_e.trunk,!1,!0)}}for(let re=0;re<5;re++){const j=U(1);if(!j)continue;const Te=1.9+Math.random()*.8,Ie=Math.random()<.5;p(.85,Te,.85,j[0],0,j[1],_e.cactus,!0,!0);for(const ye of[-1,1]){const Xe=.7+(ye>0?.2:.55),Ke=Ie?ye*.7:0,Qe=Ie?0:ye*.7;p(Ie?.6:.45,.42,Ie?.45:.6,j[0]+Ke*.75,Xe,j[1]+Qe*.75,_e.cactus,!1,!0),p(.45,.85,.45,j[0]+Ke*1.2,Xe,j[1]+Qe*1.2,_e.cactus,!1,!0)}}}else{const z=[...Array(4).fill([[0,0,0],[2,0,0],[1,2,0]]),...Array(4).fill([[0,0,0],[2,0,0]]),...Array(3).fill([[0,0,0]])];for(const ne of z){const ee=U(ne.length>1?2.2:1.2);if(!ee)continue;const re=Math.random()<.5;for(const[j,Te,Ie]of ne)p(2,2,2,ee[0]+(re?j:Ie)-(ne.length>1&&re?1:0),Te,ee[1]+(re?Ie:j)-(ne.length>1&&!re?1:0),_e.crate,!0,!0)}for(let ne=0;ne<5;ne++){const ee=U(1.6);ee&&(p(1,3,1,ee[0],0,ee[1],_e.trunk,!0,!0),p(3.4,2.4,3.4,ee[0],3,ee[1],_e.leaves,"leaf",!0),p(2,1.2,2,ee[0],5.4,ee[1],_e.leaves,"leaf",!0))}}po(h,ce,!0);for(const z of h.children){const ne=z;ne.material=il(ne.material)}S=[];for(let z=0;z<gs;z++)S.push(U(.8)??[z*3-9,-3]);g=u.filter(z=>z.kind!=="leaf"&&z.box.max.x-z.box.min.x>1.6&&z.box.max.z-z.box.min.z>1.6).map(z=>{const ne=z.box;return{x:(ne.min.x+ne.max.x)/2,z:(ne.min.z+ne.max.z)/2,h:ne.max.y,sx:(ne.max.x-ne.min.x)/2-.3,sz:(ne.max.z-ne.min.z)/2-.3}})};let S=[],g=[];const f=(C,X)=>{let se=0;for(const ce of r.solids){const p=ce.box;ce.kind!=="leaf"&&C>p.min.x&&C<p.max.x&&X>p.min.z&&X<p.max.z&&p.max.y<30&&(se=Math.max(se,p.max.y))}return se},E=(C,X)=>{let se=0;for(const ce of r.solids){const p=ce.box;C>p.min.x&&C<p.max.x&&X>p.min.z&&X<p.max.z&&p.max.y<30&&(se=Math.max(se,p.max.y))}return se};v0(i,[new he(0,0,0)],!0),e.shadowArea(new he(0,0,0),it+4);const y=new La(Ls[0].look);i.add(y.root);const _=new ol(y,(C,X,se)=>r.move(C,X,se));_.setSpawn(new he(_a.x,.01,_a.z),Math.PI),_.onJump=()=>{Ve.play("jump",.08),w(_.pos.x,_.pos.y,_.pos.z,.5,0)},_.onLand=C=>{C>10&&Ve.play("land",.1),C>6&&w(_.pos.x,_.pos.y,_.pos.z,Math.min(1.4,C/13),0)};const R=new Co(i),T=new Co(i),I=30;let x=I;const w=(C,X,se,ce,p)=>{const A=bn.tier===0;if(p===2&&A||p>0&&(Math.hypot(_.pos.x-C,_.pos.z-se)>(p===1?24:18)||x<=0))return;const k=ce*(A?.5:1);p>0&&(x-=Math.round(10*k)),T.emit("puff",oe.set(C,X+.12,se),k)},N=new Io(i),O=new Io(i,Gg(),300,!0),B=new Vg(i,it,N,O),te=new Wg(i,it),$=new Xg(i,it),V=new Uv(n),J=new he;let Y=!1;const ie=new tv(n,{touch:()=>a.state.touch,reelsSpinning:()=>me.spinning,moved:()=>Math.hypot(_.pos.x-J.x,_.pos.z-J.z),jumped:()=>Y,highlightStop:C=>me.highlight(C),highlightJump:C=>a.highlightJump(C),ghostStick:C=>a.ghostStick(C),avoid:()=>me.rect(),L:It,round:Rn});V.setLabels(It("ЕЩЁ РАЗ","AGAIN"));const me=new Zg(n,It("СТОП","STOP")),fe=new Hv(n,It),Ae=new kv(n,It),De=new sv(n,It),dt="chaos_points",yt=()=>({score:ct.snapshot().score??0,name:(/^guest(\s|$)/i.test(gt.leaderboards.player.name)?"":gt.leaderboards.player.name)||It("Игрок","Player")}),nt=new mv(n,It,{demo:!gt.leaderboards.available&&gt.leaderboards.demo,me:yt,load:async()=>{if(!gt.leaderboards.available)return gv(yt());const C=gt.leaderboards.player.id;return(await gt.leaderboards.fetchTop(dt,50)).map(se=>({rank:se.rank,name:se.player.publicName,score:se.score,photo:se.player.getAvatarSrc("small"),me:!!C&&se.player.uniqueID===C}))}}),Q=()=>gt.leaderboards.available||gt.leaderboards.demo,xe=C=>{C>0&&gt.leaderboards.available&&gt.leaderboards.submit(dt,C).catch(X=>console.warn("[leaderboard]",X))},oe=new he,ke=new hv(i,r,gs,{heightAt:(C,X)=>f(C,X),cell:(C,X)=>B.at(C,X),lava:()=>$.level,time:()=>Oe,mobs:()=>de.mobs,spots:()=>g,puff:(C,X,se,ce)=>w(C,X,se,ce,1),died:(C,X,se)=>{R.emit("poof",oe.set(C,X+1,se),.8),Math.hypot(_.pos.x-C,_.pos.z-se)<18&&Ve.play("respawn",.25,.5)},player:()=>Re==="play"?_.pos:null});let Oe=0,Fe=0,ht=!1,Re="play",Je=0,ze=0,Ye=0,St=0,xt=0,At=0,Rt=0;const pt=new Map;let Et=!1,P="",Tt=Xv,We=0,M="normal";const m=()=>Kv[M],F=[],H=C=>{Re==="play"&&(Re="dead",P=C,Tt=0,We=0,V.setHearts(0,m().hearts),y.root.visible=!1,me.hide(),R.emit("poof",oe.copy(_.pos).setY(_.pos.y+1.2),1.6),R.emit("confetti",oe,1),s.shake(.4),Ve.play("respawn",0),ae(!1))},W=(C,X=0,se=0)=>{if(Re!=="play"||We>0)return;if(Tt--,V.setHearts(Tt,m().hearts),Tt<=0){H(C);return}We=jv;let ce=Math.hypot(X,se);if(ce<.001){const A=Math.random()*6.28;X=Math.cos(A),se=Math.sin(A),ce=1}const p=$.level>-2?2.5:7;_.vel.x=X/ce*p,_.vel.z=se/ce*p,_.vel.y=$.level>-2?4:6,R.emit("poof",oe.copy(_.pos).setY(_.pos.y+1.2),1,[16730698,16777215]),s.shake(.3),Ve.play("hurt",.1)},le=(C,X,se,ce)=>{const p=pt.get(C)??0;if(pt.set(C,p+1),p>0||Re!=="play")return;const A=Zv[C];if(!A)return;At=Jv,V.announce(ce??It(A[0],A[1]),A[2]);const k=Math.hypot(_.pos.x-X,_.pos.z-se);s.shake(k<20?.25:.1),Ve.play("checkpoint",.15)};B.onReact=(C,X,se)=>le(C,X,se);const ve=C=>{const X=Ws(1,C.adj,C.kind).join(" ");return X[0].toUpperCase()+X.slice(1)},K=(C,X,se,ce,p=!1,A=1)=>ke.hit(C,X,se,ce,p,A),Z=()=>Re==="play"&&ze===0&&_.grounded&&_.pos.y>=Ds+2.4,de=new Dv(i,it,B,R,N,O,{perched:Z,heightAt:f,impactAt:E,lavaLevel:()=>$.level,target:()=>Re==="play"?_.pos:null,targetVel:()=>_.vel,touchPlayer(C,X,se,ce){if(X){W(ve(C),se,ce);return}const p=Math.hypot(se,ce)||1;_.vel.x+=se/p*9,_.vel.z+=ce/p*9,_.grounded&&(_.vel.y=6),Ve.play(C.kind==="cat"?"meow":C.kind==="chicken"?"cluck":"bounce",.15,.7)},slip(){xt<=0&&(Ve.play("bounce",.3,.6),_.vel.y=Math.max(_.vel.y,5)),xt=1.3},boom(C,X,se,ce,p){const A=p.adj==="ice"||p.kind==="snowman";R.emit(A?"poof":"lava",oe.set(C,X+.5,se),Math.min(2.5,ce*.6));const k=Math.hypot(_.pos.x-C,_.pos.z-se);s.shake(Math.max(0,.45-k*.03)*Math.min(2,ce/2)),k<40&&Ve.play(A?"freeze":"boom",.12,Math.min(1,1.25-k/32)*Math.min(1.2,.5+ce*.15)),Re==="play"&&k<ce&&Math.abs(_.pos.y-X)<2.6&&W(ve(p),_.pos.x-C,_.pos.z-se),K(C,X,se,ce*1.2,!1,1.8)},hitDummies:(C,X,se,ce,p)=>ce>0?K(C,X,se,ce,p):[],react:(C,X,se,ce)=>le(C,X,se,ce),land:(C,X,se,ce)=>w(C,X,se,Math.min(1.2,.45*ce),2),nudge:(C,X,se)=>{Re==="play"&&(_.vel.x+=C,_.vel.y=Math.min(_.vel.y+X,9),_.vel.z+=se)}}),Pe=new u0(i,{impactAt:E,perched:Z,gather:(C,X)=>{le("storm",C,X),Ve.play("boom",.1,.35,.55)},strike(C,X,se,ce){R.emit("poof",oe.set(C,X+.4,se),1.2,[16774824,16769357,16777215]);const p=Math.hypot(_.pos.x-C,_.pos.z-se);s.shake(Math.max(.1,.5-p*.03)),Ve.play("zap",.1),Ve.play("boom",.1,.9),Re==="play"&&p<ce&&_.pos.y>X-.6&&_.pos.y<X+2.6&&W(It("Молния","Lightning"),_.pos.x-C,_.pos.z-se),X<.5&&B.ignite(C,se,4),K(C,X,se,ce,!1,1.4)}}),ge=new Map;let pe="rookie";const Ue=C=>{pe=Ta(C).id;const X=ge.get(pe);X&&y.setModel(X)},Ne=()=>{const C=Qi.map(X=>X.id).filter(X=>X!==pe&&ge.has(X)).sort(()=>Math.random()-.5);ke.list.forEach((X,se)=>{const ce=ge.get(C[se%Math.max(1,C.length)]);ce&&X.avatar.setModel(ce)})},Ge=()=>{F.length=0,Et=!1,pt.clear(),At=0,Rt=0,Oe=0,Fe=Yv,ht=!1,Je=0,ze=0,Ye=0,xt=0,Re="play",B.reset(),de.reset(),$.reset(),N.clear(),O.clear(),te.on=!1,Pe.reset(),Pe.delay=m().storm,me.hide(),b(),ke.reset(S),ge.size&&Ne(),Tt=m().hearts,We=0,V.setHearts(Tt,Tt),de.level.runners=m().runners,de.level.speed=m().speed,de.level.chase=m().chase,de.level.roam=m().roam,y.root.visible=!0,_.respawn(),_.grip=1,_.speedMul=1,V.hideResult(),V.setTime(Rn)};let L="round",ue=ct.snapshot().muted;const q=()=>{Ve.setSfxVolume(ue?0:1),Ve.setMusicVolume(ue?0:1)},be=()=>{L="round",fe.hide(),fe.setPauseButton(!0),V.setHud(!0),a.setVisible(!0),Ge(),V.announce(It(`ВЫЖИВИ ${Rn} СЕКУНД!`,`SURVIVE ${Rn} SECONDS!`),"#fff"),J.copy(_.pos),Y=!1,Ce=!1,Le=0;const C=ct.snapshot();!C.tutorial&&C.runs===0?ie.start():ie.stop(),ie.setVisible(!0),Ve.setDuck(!1),gt.gameplayStart()},Se=()=>{L="menu",me.hide(),fe.setPauseButton(!1),V.setHud(!1),a.setVisible(!1),fe.showMain(M,ue,ct.snapshot().coins,pe),ie.stop(),gt.gameplayStop(),Ve.setDuck(!1)},ae=C=>{const X=ct.snapshot(),se=C?Rn:Math.floor(Oe),ce=X.best[M]??0,p=se>ce,A=Math.max(0,Pg(se,C,M)-Le);Le+=A,at=A,Ce||na++,ie.stop();const k=(X.score??0)+A;ct.patch({tutorial:!0,runs:X.runs+(Ce?0:1),best:p?{...X.best,[M]:se}:X.best,coins:X.coins+A,score:k}),xe(k),fe.setPauseButton(!1),gt.gameplayStop(),C||Ve.play("fail",0,1),setTimeout(()=>{L!=="round"||Re==="play"||(V.setHud(!1),a.setVisible(!1),fe.showResult({win:C,title:C?It("ТЫ ВЫЖИЛ!","YOU SURVIVED!"):It("ТЫ ПОГИБ","YOU DIED"),cause:C?void 0:P,time:se,round:Rn,botsAlive:ke.alive+(C?1:0),botsTotal:gs+1,best:Math.max(ce,se),newBest:p&&ce>0,difficulty:M,coins:A,total:ct.snapshot().coins,canRevive:!C&&!Ce&&Oe<Rn-3}))},700)};let Ce=!1,Le=0;const wt=()=>{if(Re!=="dead")return;Ce=!0,Re="play";const C=[...v];let X=C[0],se=-1/0;for(const p of C){const A=f(p[0],p[1]);A>se&&(se=A,X=p)}const ce=_.spawn.clone();_.setSpawn(oe.set(X[0],se+.2,X[1])),_.respawn(),_.setSpawn(ce),Tt=Math.min(2,m().hearts),V.setHearts(Tt,m().hearts),We=3,y.root.visible=!0,L="round",fe.hide(),fe.setPauseButton(!0),V.setHud(!0),a.setVisible(!0),Ve.setDuck(!1),R.emit("confetti",oe.copy(_.pos).setY(_.pos.y+1.5),1),Ve.play("tada",0,.6),V.announce(It("ТЫ СНОВА В ИГРЕ!","BACK IN THE GAME!"),"#7dff6a"),gt.gameplayStart()};fe.onRevive=async()=>Re!=="dead"||Ce||!await ps()||Re!=="dead"?!1:(wt(),!0);let at=0;fe.onDouble=async()=>{if(at<=0||(gt.gameplayStop(),!await ps()))return!1;const X=ct.snapshot();return ct.patch({coins:X.coins+at}),at=0,fe.setCoins(ct.snapshot().coins),!0};const kt=()=>{const C=ct.snapshot(),X=C.owned.includes("rookie")?C.owned:["rookie",...C.owned];return{coins:C.coins,owned:X,selected:pe,adViews:C.adViews??{}}},tn=C=>{const X=ct.snapshot();X.owned.includes(C)||ct.patch({owned:[...X.owned,C]}),ta(C)},ta=C=>{Ue(C),ct.patch({skin:pe}),Ne(),Ve.play("tada",0,.5),Ae.show(kt())};fe.onCharacters=()=>{Ae.show(kt())},fe.setMap(d),fe.onMap=C=>{C!==d&&(d=C,ct.patch({map:C}),Ge(),Se())},fe.onEncyclopedia=()=>{De.show(ct.snapshot().seen??[])},fe.setLeaderboard(Q()),gt.onCapabilitiesChange(()=>fe.setLeaderboard(Q())),fe.onLeaderboard=()=>{nt.show()},nt.onClose=()=>{nt.hide(),fe.showMain(M,ue,ct.snapshot().coins,pe)},De.onClose=()=>{De.hide(),fe.showMain(M,ue,ct.snapshot().coins,pe)},Ae.onClose=()=>{Ae.hide(),fe.showMain(M,ue,ct.snapshot().coins,pe)},Ae.onSelect=C=>{kt().owned.includes(C)&&ta(C)},Ae.onBuy=C=>{const X=Ta(C),se=ct.snapshot();X.id!==C||kt().owned.includes(C)||se.coins<X.price||(ct.patch({coins:se.coins-X.price}),tn(C))},Ae.onAd=async C=>{const X=Ta(C);if(X.id!==C||X.ads<=0||kt().owned.includes(C))return;if(!await ps()){Ae.show(kt());return}const ce=ct.snapshot(),p=(ce.adViews?.[C]??0)+1;ct.patch({adViews:{...ce.adViews??{},[C]:p}}),p>=X.ads?tn(C):Ae.show(kt())};let na=0,ai=!1;const si=async()=>{if(!ai){if(na>0){ai=!0;try{await Fv()}catch{}finally{ai=!1}}be()}};fe.onPlay=C=>{M=C,ct.patch({difficulty:C}),si()},fe.onRetry=()=>{si()},fe.onMenu=Se,fe.onPause=()=>{L!=="round"||Re!=="play"||(L="pause",V.setHud(!1),a.setVisible(!1),fe.showPause(ue),ie.setVisible(!1),gt.gameplayStop(),Ve.setDuck(!0))},fe.onResume=()=>{L==="pause"&&(L="round",ie.setVisible(!0),V.setHud(!0),a.setVisible(!0),fe.hide(),gt.gameplayStart(),Ve.setDuck(!1))},fe.onMute=C=>{ue=C,q(),ct.patch({muted:C})};const Ba={fire:"fire",ice:"freeze",bouncy:"boing",giant:"thud",fast:"whoosh"},ia={chicken:"cluck",cat:"meow",shark:"splash",banana:"boing",meteor:"whoosh",bomb:"thud",snowman:"freeze",slime:"splash",zombie:"thud",dino:"thud",ufo:"zap",tornado:"whoosh",bee:"buzz",boulder:"rumble",frog:"croak"},aa=C=>{Ve.play("checkpoint",0,.6);const X=Ba[C.adj],se=ia[C.noun];X&&X!==se&&setTimeout(()=>Ve.play(X,.05,.9),120),setTimeout(()=>Ve.play(se,.05,1,C.adj==="giant"?.75:C.adj==="fast"?1.2:1),X?420:150)},mn=C=>{if(Re!=="play")return;ht=!0,V.announce(Fo(C.n,C.adj,C.noun),$v[C.adj]),F.push(Fo(C.n,C.adj,C.noun));const X=ct.snapshot().seen??[],se=[C.adj,C.noun].filter(ce=>!X.includes(ce));se.length&&ct.patch({seen:[...X,...se]}),aa(C),de.start(C)},Pi=C=>{if(!ht){Re==="play"&&Je===0&&(Fe-=C)<=0&&(me.spin(mn,gc(0)),Je++);return}for(Oe+=C,Re==="play"&&V.setTime(Rn-Oe),Re==="play"&&Je<mc.length&&Oe>=mc[Je]&&(me.spin(mn,gc(Je)),Je++),!Et&&Oe>=xa[0].at-3&&(Et=!0,V.announce(It("ЛАВА СКОРО! ЗАБИРАЙСЯ ВЫШЕ!","LAVA SOON! CLIMB UP!"),"#ffb02a"),Ve.play("checkpoint",0));ze<xa.length&&Oe>=xa[ze].at;){const X=xa[ze];V.announce(It(X.ru,X.en),"#ff5a2a"),$.rise(X.sec*m().lava,X.top),s.shake(.25),Ve.play("bubble",.05,.9),(ze===0||ze===2)&&setTimeout(()=>Ve.play("whoosh",.05),500),ze===0&&de.start({n:m().meteors[0],adj:"fire",noun:"meteor"},m().aim),ze===2&&de.start({n:m().meteors[1],adj:"fire",noun:"meteor"},m().aim),ze++}if(te.on=de.has("ice"),te.on&&Math.random()<C*12){const X=Math.floor(Math.random()*B.n*B.n);B.freeze(X)&&R.emit("poof",B.center(X,oe).setY(.6),.6)}Re==="play"&&Oe>=Rn&&(Re="win",me.hide(),Ve.play("tada",0),Ve.play("cheer",.03),R.emit("confetti",oe.copy(_.pos).setY(_.pos.y+2),2),ae(!0))},sa=C=>{const se=_.grounded&&_.pos.y<Ds?B.at(_.pos.x,_.pos.z):ut.None;xt-=C,_.grip=se===ut.Ice||xt>0?.08:1,Ye=se===ut.Fire?Ye+C:0,Ye>qv&&(Ye=0,We<=0&&Ve.play("fire",.1),W(It("Сгорел","Burned"))),Rt=se===ut.Shock?Rt+C:0,Rt>.15&&(Rt=0,We<=0&&Ve.play("zap",.1),W(It("Ударило током","Zapped"))),_.speedMul=se===ut.Slime?.45:1,_.pos.y<Vv?H(It("Упал с острова","Fell off")):$.level>-2&&$.level>_.pos.y+.1&&H(It("Лава","Lava"))},ra=new he,ri=C=>{if(L!=="round"){L==="menu"&&(s.yaw+=C*.12),s.update(C,_.pos);return}a.update();const X=a.consumeLook();if(s.rotate(X.x,X.y,X.zoom),me.update(C),ie.active&&(a.state.jump&&(Y=!0),ie.update(C)),me.spinning){V.update(C),s.update(C,_.pos);return}const se=C;if(At>0&&(At-=se,C*=Qv),Re==="play"||Re==="win"?_.update(C,a.state.move,a.state.jump,s.forward(ra)):s.yaw+=C*.15,Pi(C),Re==="play"&&sa(C),Re==="play"&&ht&&Pe.update(C,_.pos),We>0&&(We-=C,y.root.visible=Re!=="dead"&&(We<=0||Math.floor(We*12)%2===0)),B.update(C),de.update(C),N.commit(C),O.commit(C),te.update(C),$.update(C),St-=C,St<=0&&B.burning.length){const ce=B.burning[Math.floor(Math.random()*B.burning.length)];R.emit("lava",B.center(ce,oe).setY(.3),.35),St=.12}ke.update(C,Re==="play"?_:null,s.camera.position),R.update(C),T.update(C),x=I,V.update(se),s.update(se,_.pos),M0(_.pos,s.camera.position)};let Un=!1;const Kn=new df,Ii=()=>{L==="round"&&Re==="play"&&fe.onPause?.()},Di=()=>{const C=Un;Un=document.hidden||gt.isPaused,Un&&!C&&Ii(),Un||Kn.getDelta()};return document.addEventListener("visibilitychange",Di),gt.onPauseChange(Di),addEventListener("blur",Ii),{renderer:t,resize(C,X){s.resize(C,X)},async load(C){_.respawn(),C(.3),await Ve.load(),C(.4),new URLSearchParams(location.search).get("tex")!=="0"&&await T0({[_e.grass]:"grass",[_e.dirt]:"dirt",[_e.stone]:"stone",[_e.stoneDark]:"stone",[_e.crate]:"planks",[_e.trunk]:"bark",[_e.leaves]:"leaves",[_e.fence]:"wood",[_e.post]:"wood",[_e.sand]:"sand",[_e.sandRock]:"sandstone",[_e.pyr]:"sandstone",[_e.pyrDark]:"sandstone",[_e.ruin]:"sandstone",[_e.adobe]:"sand",[_e.palmTrunk]:"palmbark",[_e.palm]:"palmleaf",[_e.cactus]:"cactus"},bn.tier===0?1:4),C(.5),await Promise.all(Qi.map(async ce=>{try{ge.set(ce.id,await Cg(ce.id))}catch{}})),Ue(ct.snapshot().skin),Ne(),C(.6);const X=[],se=[];i.traverse(ce=>{ce.visible||(X.push(ce),ce.visible=!0);const p=ce;p.isInstancedMesh&&p.count===0&&(p.count=1,se.push(()=>{p.count=0}));const A=ce.geometry;A&&A.drawRange.count===0&&(A.drawRange.count=1/0,se.push(()=>{A.drawRange.count=0})),ce.frustumCulled&&(ce.frustumCulled=!1,se.push(()=>{ce.frustumCulled=!0}))});for(const ce of ge.values()){const p=ce.mat.map;p&&t.initTexture(p)}await t.compileAsync(i,s.camera),t.render(i,s.camera);for(const ce of X)ce.visible=!1;for(const ce of se)ce();C(1)},start(){q(),Ve.startMusic();const C=ct.snapshot();C.runs===0?(M="easy",be()):(M=["easy","normal","chaos"].find(X=>X===C.difficulty)??"normal",Ge(),Se()),t.setAnimationLoop(()=>{const X=Kn.getDelta(),se=Math.min(X,1/20);Un||(ri(se),t.render(i,s.camera),o.frame(X),bn.frame(X))})}}}export{i_ as createScene};
