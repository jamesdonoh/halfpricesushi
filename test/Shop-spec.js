import { expect } from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdomGlobal from 'jsdom-global'; jsdomGlobal();

import Shop from '../components/Shop';

describe('Shop component', function () {
    it('renders name', function () {
        var component = TestUtils.renderIntoDocument(
            <Shop name="Aldgate" closes="4pm" />
        );

        var nameSpan = TestUtils.findRenderedDOMComponentWithClass(component, 'shop__name');

        expect(nameSpan.textContent).to.equal('Aldgate');
    });

    it('renders closing time', function () {
        var component = TestUtils.renderIntoDocument(
            <Shop name="Aldgate" closes="4pm" />
        );

        var closesSpan = TestUtils.findRenderedDOMComponentWithClass(component, 'shop__closes');

        expect(closesSpan.textContent).to.equal('4pm');
    });
});
