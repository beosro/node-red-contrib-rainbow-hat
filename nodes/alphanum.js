/**
 * Copyright 2018 Wolfgang Flohr-Hochbichler wflohr72@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function (RED) {

    "use strict";
    const FourteenSegment = require('ht16k33-fourteensegment-display');
    const segment = new FourteenSegment(0x70, 1);

    function RainbowHatLED(config) {
        RED.nodes.createNode(this, config);

        this.on('input', (val) => {
            if (val) {
                if (val.payload) {
                    segment.display.setBrightness(config.brightness);
                    segment.display.setBlinkRate(config.blinkRate);
                    segment.writeString(val.payload);
                } else {
                    segment.clear();
                }
            } else {
                segment.clear();
            }
        });
    }

    RED.nodes.registerType("rainbow-hat-alphanum", RainbowHatLED);
}