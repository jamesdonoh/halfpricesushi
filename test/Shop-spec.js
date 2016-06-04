import { expect } from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdomGlobal from 'jsdom-global'; jsdomGlobal();

import Shop from '../components/Shop';

describe('Shop component', function () {
    it('shows correct closing time message', function () {
        var component = TestUtils.renderIntoDocument(
            <Shop closes="4pm" />
        );

        var listItem = TestUtils.findRenderedDOMComponentWithTag(component, 'li');

        expect(listItem.textContent).to.equal('closes at 4pm');
    });
});
