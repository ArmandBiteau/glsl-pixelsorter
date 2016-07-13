precision mediump float;

varying vec2 vTextureCoord;

uniform vec2 iResolution;
uniform sampler2D uSampler;
uniform sampler2D uText;

void main() {

    vec2 tDifCoords = vec2(vTextureCoord.x+0.208, vTextureCoord.y+0.395);
    vec4 tDiffuse = texture2D(uSampler, tDifCoords);
    vec4 tText = texture2D(uText, vTextureCoord);

    gl_FragColor = vec4( vec3(tDiffuse.rgb * tText.rgb), tText.r);

}
