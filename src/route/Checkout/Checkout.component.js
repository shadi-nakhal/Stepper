/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
/** @namespace Route/Checkout/Component */

import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import ContentWrapper from "SourceComponent/ContentWrapper";
import Stepper from "../../component/Stepper/Stepper.component";

class Checkout extends SourceCheckout {
  render() {
    // console.log(Object.keys(this.stepMap), this.props.checkoutStep);

    return (
      <main block="Checkout">
        <Stepper
          steps={Object.keys(this.stepMap)}
          location={this.props.checkoutStep}
        />
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default Checkout;
