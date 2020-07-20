import {default as ComponentController} from '../../../src/controller/Component.mjs';
import NeoArray                         from '../../../src/util/Array.mjs';

/**
 * @class CalendarBasic.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends ComponentController {
    static getConfig() {return {
        /**
         * @member {String} className='CalendarBasic.MainContainerController'
         * @protected
         */
        className: 'CalendarBasic.MainContainerController'
    }}

    /**
     *
     * @return {Neo.component.Base}
     */
    getWeeklyTimeAxis() {
        // todo: create an easier access, e.g. calendar.weekComponent
        return this.getReference('calendar').down('calendar-view-weekComponent').timeAxis;
    }

    /**
     *
     * @param {Object} data
     */
    onEndTimeFieldChange(data) {
        this.getWeeklyTimeAxis().endTime = data.value;
    }

    /**
     *
     * @param {Object} data
     */
    onIntervalFieldChange(data) {
        this.getWeeklyTimeAxis().interval = data.value;
    }

    /**
     *
     * @param {Object} data
     */
    onRowHeightFieldChange(data) {
        this.getWeeklyTimeAxis().rowHeight = data.value;
    }

    /**
     *
     * @param {Object} data
     */
    onStartTimeFieldChange(data) {
        this.getWeeklyTimeAxis().startTime = data.value;
    }

    /**
     *
     * @param {Object} data
     */
    onSwitchThemeButtonClick(data) {
        let me            = this,
            button        = data.component,
            headerToolbar = me.getReference('headerToolbar'),
            view          = me.view,
            buttonText, cls, headerColor, iconCls, theme;

        if (button.text === 'Theme Light') {
            buttonText  = 'Theme Dark';
            headerColor = '#f2f2f2';
            iconCls     = 'fa fa-moon';
            theme       = 'neo-theme-light';
        } else {
            buttonText  = 'Theme Light';
            headerColor = '#33343d';
            iconCls     = 'fa fa-sun';
            theme       = 'neo-theme-dark';
        }

        cls = [...view.cls];

        view.cls.forEach(item => {
            if (item.includes('neo-theme')) {
                NeoArray.remove(cls, item);
            }
        });

        NeoArray.add(cls, theme);
        view.cls = cls;

        button.set({
            iconCls: iconCls,
            text   : buttonText
        });

        let style = headerToolbar.style || {};
        style.backgroundColor = headerColor;
        headerToolbar.style = style;
    }
}

Neo.applyClassConfig(MainContainerController);

export {MainContainerController as default};