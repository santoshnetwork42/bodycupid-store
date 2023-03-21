import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

function RefundPolicy({ store }) {
  const { name } = store;

  return (
    <main className="main about-us">
      <Head>
        <title>{name} | Titles</title>
      </Head>

      <h1 className="d-none">Refund policy - {name}</h1>

      <div className="page-content">
        <div className="container">
          <section className="mt-10 pt-3">
            <h2 className="title title-center">REFUND POLICY</h2>
          </section>

          <section className="mt-10 pt-2">
            <h2 className="title title-simple">PAYMENT POLICY</h2>
            <p className="text-grey">
              1. We accept online orders through the following modes of payment.
              Visa & MasterCard Debit & Credit cards from select banks in India.
              2. Please note that for Visa and MasterCard you will require to
              submit your 16-digit credit card number, card expiry date and a
              3-digit CVV number (on the back of the card) when you make an
              online transaction using your Credit Card. 3. You should also have
              enrolled your Credit Card with VBV (Verified by Visa) or MSC
              (MasterCard Secure Code) to complete the transaction. For American
              Express Cards you will be required to give your 15-digit card
              number and a 4-digit code. 4. The Credit Card transaction will
              appear on your bank statement as a payment to Body Cupid Pvt Ltd.
              5. If the amount has been deducted from your account but you
              haven’t received a confirmation from us, you can reach out to our
              customer care team and provide the following information: a.
              Transaction Reference Number. b. Amount debited with registered
              Email ID c. Date & Time of Transaction.
            </p>
          </section>
          <section className="mt-10 pt-2">
            <h2 className="title title-simple">SHIPPING POLICY</h2>
            <p className="text-grey" a>
              1. The shipping and handling charges are mentioned at the time of
              check out and consumers will know about this before making
              payments. 2. Once your order has been confirmed and dispatched,
              you will receive an email with the details of the tracking number
              and the courier company. We usually dispatch most orders within
              1-4 business days. 3. The estimated delivery time may vary
              slightly from state to state. Days excluding Saturdays, Sundays,
              and Holidays are calculated as working days. Product delivery may
              get delayed due to reasons relating to logistics issues. 4. If you
              are ordering our products from a Mega Sale event, dispatches may
              be delayed due to increased volumes. We will target to dispatch
              all orders within a maximum of 7 days from the Date of Order. 5.
              Split shipments are completely normal. This just means that
              different parts of your order may have simply been shipped from
              our different warehouse locations across India. Rest assured, you
              will only have to pay the shipping/COD charge if applicable, on
              the first package you receive.
            </p>
          </section>

          <section className="mt-10 pt-2">
            <h2 className="title title-simple">DELIVERY POLICY</h2>
            <p className="text-grey" a>
              1. Cash on Delivery (COD) option is available for all products
              subjected to availability, promotions and offers. 2. We take
              extensive precautions on the safety of the products and its
              packaging while dispatching it. We pack our products in boxes,
              where each individual product is wrapped in bubble wrap while
              fragile items like bottles are safely secured with additional
              bubble wrap. 3. If the shipment is tampered or damaged, please do
              not accept it. 4. Orders placed on the second half of Saturday or
              Sunday will be dispatched within 48-72 hours. 5. If the order is
              updated as delivered but the user has not received the order, the
              same has to be intimated to the customer service team via call or
              email within 24 hours of the delivery intimation, wherein you will
              have to give 48-72 hours to investigate with our courier partners.
              6. For all claims regarding shortages or damages must be reported
              to customer service within 24 hours of the order delivery. 3
              working days are required to investigate and review your request.
              If any shipment is tampered with or damaged, please do not accept
              it. 7. In case our reverse pick-up service is not available at
              your location, you will need to self-ship the product via any
              reliable courier partner. We will reimburse the courier charges,
              either in your account or as WOW Pro Points. 8. We are not
              responsible for damages post-delivery. We do not take
              responsibility for the misplacement of products post-delivery. 9.
              We reserve the right to pause deliveries to any part of the
              country at any time if so warranted. 10. Products with a date of
              expiration of below 3 months would be eligible for a return,
              wherein, the complete amount of the product will be credited to
              the concerned person. No returns or refund requests will be
              accepted for products whose expiry date is more than 3 months. 11.
              Resellers are not eligible for Pro Points & Offers.
            </p>
          </section>

          <section className="mt-10 pt-2">
            <h2 className="title title-simple">CANCELLATION POLICY</h2>
            <p className="text-grey" a>
              1. Orders once dispatched are not eligible for cancellation. 2.
              Discount vouchers are intended for one-time use only and shall be
              treated as used even if you cancel the order. 3. If you had
              redeemed loyalty points for an order, the same will be credited
              back to your account in the case of a cancellation. 4. In case of
              a return or cancellation, the refund shall be initiated post the
              return of product to us and verification of the product and
              packing.
            </p>
          </section>

          <section className="mt-10 pt-2">
            <h2 className="title title-simple">RETURN & EXCHANGE POLICY</h2>
            <p className="text-grey" a>
              1. WOW Skin Science and {name} products are non-returnable due to
              hygiene/health and personal care/wellness/consumable nature of the
              product. 2. In case you would want a refund or replacement, please
              send us an email with the Images of the Product, Invoice, Inner &
              Outer Packaging and Batch Number to support@buywow.in, within 24
              hours of the order delivery. We would require 48-72 hours to
              revert. 3. Kindly take picture of the damaged/tampered side of the
              product or package. 4. Please allow us 10 to 15 days from the day
              you return your package, for your request to be processed. We may
              contact you to ascertain the damage or defect in the product prior
              to issuing refund/replacement. 5. You will be eligible for full
              refund or exchange without incurring any additional charges if it
              is the case of: a. Package has accessories missing. b. Damaged or
              broken bottles/pack. c. Wrong product delivery. d. Expired product
              delivery. 6. In case you received a wrong product, we request you
              to keep the product safe, saleable and undamaged in its original
              packaging. Retain the invoice and original manufacturer’s packing
              for successful pick-up and return. 7. Returns will not be accepted
              if: a. The product is damaged. b. It is without invoice. c. It is
              with tampered batch number and price d. It is without its original
              packaging. 8. Please do not use the item you have raised a
              complaint about. 9. If a pilfered delivery was received, pilferage
              claims must be made within 24 hours of the order delivery. 10.
              Products once delivered, will not be applicable for a refund if it
              falls under any of the scenarios stated below: a. Failure to
              provide adequate information about the case. b. Failure to provide
              snapshots of the Invoice, packet and box (if any). 11. Damages due
              to neglect, improper usage or wrong application will not be
              covered under our Exchange/Returns Policy. Please note that orders
              for Festive Gift boxes are not applicable for exchange or refund.
              Exchange of products due to allergic reactions is not applicable.
            </p>
          </section>

          <section className="mt-10 pt-2">
            <h2 className="title title-simple">REFUND & REPLACEMENT POLICY</h2>
            <p className="text-grey">
              We may contact you to ascertain the damage or defect in the
              product prior to issuing refund/replacement. Refunds will be
              through bank transfers. No cash refunds will be made. It would
              take our team at least 5 to 7 business days post refund initiation
              for online refund to be initiated. In case of NEFT, it would
              require us at least 3 to 5 business days post refund initiation to
              refund your amount. For Prepaid orders the amount shall be
              credited to your account through which the payment was done. It
              may take 7-10 business days for the amount to reflect in your
              account.
            </p>
          </section>

          <section className="mt-10 pt-2">
            <h2 className="title title-simple">NOTE TO CUSTOMERS</h2>
            <p className="text-grey">
              FAIR USAGE POLICY We go to extensive lengths for smooth user
              experience. However, at times we need to be stringent with our
              policies to serve our customers better. We have noticed that
              although a vast majority of our customers have genuine concerns,
              where we are always upfront to support; there are some accounts
              that abuse our liberal return and exchange policies. These
              accounts typically return items, choose not to accept our
              shipments or demand cashback for issues that we are not
              responsible for. Hence, our regular customers are deprived of the
              opportunity to purchase these products themselves. To protect the
              right of our customers, our customer care support team reserves
              the right to assess, judge and then take the necessary action at
              their discretion. IMPAIRMENT & DAMAGES We take the utmost care and
              accountability while sending our products to you. Your package is
              screened and goes through an extensive quality check so that we
              deliver the best to you. However, if you have received partial,
              void or damaged items through your order on our website directly,
              kindly contact the customer service team within 24 hours of the
              order delivery. Please keep a note of the following: 1. Do not use
              the products 2. Take proper snapshots of the products 3. Keep the
              invoice copy with you If, however, the order is placed through an
              online marketplace, please raise the issue to our customer service
              team. In such a case, WOW Skin Science and {name} is not
              responsible for any damages caused.
            </p>
          </section>

          <section className="mt-10 pt-2">
            <h2 className="title title-simple">CHANGE OF PACKAGING</h2>
            <p className="text-grey">
              Packaging, bottles and communications at WOW Skin Science and WOW
              Life Science undergo constant innovation and changes without
              affecting the formulation and efficacy of the product. These
              changes are for seamless user experience and comply with
              government notifications. Presence and placements of symbols or
              stickers depicting the information regarding the product may vary
              conforming to government rules and regulations. There can be
              changes in the placement of sticker and symbol, but please be
              assured that the product is authentic and untampered. In our new
              product packaging policy, we are slowly discarding outer boxes and
              packing material to be more eco-friendly. So, going forward you
              may start to receive products without its outer packaging made
              with paper. This reduced packaging will in no way hamper the
              authenticity or efficacy of the products. Reducing our carbon
              footprint takes us one step closer towards a greener future. Thank
              you for joining our efforts towards environment conservation.
            </p>
          </section>

          <section className="mt-10 pt-2">
            <h2 className="title title-simple">SUSPENDING PROMOTIONS</h2>
            <p className="text-grey">
              WOW Skin Science and {name} reserve the right to cancel any
              on-going or future promotions, offers, sales, gifts and giveaways
              on the products without any liabilities.
            </p>
          </section>
          <section className="mt-10 pt-2">
            <p>
              <strong>
                For any queries feel free to reach out to our customer care team
                at support@buywow.in who will be happy to clarify your concerns.
              </strong>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

export default connect(mapStateToProps)(React.memo(RefundPolicy));
