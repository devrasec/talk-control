'use strict';

import { CONTROLLER_COMPONENT_CHANNEL } from '@event-bus/event-bus-resolver';
import { TCComponent } from '@client/tc-component/tc-component';

/**
 * Class to use plugins with SlideView component, and have access to eventBusSlave.
 */
export class SlideViewSlave extends TCComponent {
    init() {
        this.eventBusSlave.on(CONTROLLER_COMPONENT_CHANNEL, 'registerPlugin', ({ pluginName }) => this.registerPlugin(pluginName));
    }
}
