precision mediump float;

varying vec2 vTextureCoord;

uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D uSampler;
uniform sampler2D uDisplacement;
uniform sampler2D uSorter;

float blur = 0.005;

highp float rand(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main() {

    float delta = max(0.0, min(iTime, 1.0));

    vec4 tDiffuse = texture2D(uSampler, vTextureCoord);

    float mask = 1.0;
    if (tDiffuse.r > 0.2 && tDiffuse.r < 0.85) {
        mask = 0.0;
    }

    // float modulus = mod(
    //     floor(vTextureCoord.x * 100.),
    //     floor(vTextureCoord.y * 100.)
    // ) / 100.;
    float modulus = 1.0;

    vec4 tDisplace = texture2D(uDisplacement, vTextureCoord);
    vec4 tSorter = texture2D(uSorter, vTextureCoord);

    float xDistort = - (tDisplace.r) * blur + rand(vTextureCoord)/50.0;
    float yDistort = 0.5 * max( 0.0, 0.8 - tSorter.r ) * modulus;

    vec4 color = texture2D(uSampler, vTextureCoord + ( vec2(xDistort, yDistort ) ) * mask * delta );

    gl_FragColor = color;

}
