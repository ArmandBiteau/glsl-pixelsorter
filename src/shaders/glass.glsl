precision mediump float;

varying vec2 vTextureCoord;

uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D uSampler;
uniform sampler2D uDisplacement;
uniform sampler2D uSorter;

uniform float uInvert;

float blur = 0.025;
float highAmount = 0.75;
float lowAmount = 0.15;

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

    // sort all pixels
    float mask = 1.0;

    // exclude sorted pi5xels in [0.2, 0.8] range
    if (tDiffuse.r > lowAmount && tDiffuse.r < highAmount) {
        mask = clamp(tDiffuse.r, 0.0, lowAmount);
    }

    vec4 tDisplace = texture2D(uDisplacement, vTextureCoord);
    vec4 tSorter = texture2D(uSorter, vTextureCoord);

    // xSort (everywhere)
    float xDistort = (tDisplace.r) * blur;

    // ySort (only in the mask range)
    float yDistort = - 0.25 * max( lowAmount, highAmount - tSorter.r ) * mask;

    // distorted color
    vec4 color = texture2D(uSampler, vTextureCoord + ( vec2(xDistort, yDistort ) ) * delta );

    // add noise
    gl_FragColor = color + vec4(rand(vTextureCoord)/ (highAmount*10.0)) * mask * delta;

}
