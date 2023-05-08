import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

function AboutUs({ store }) {
  const { name } = store;

  return (
    <main className="main about-us">
      <Head>
        <title>{name} | About Us</title>
      </Head>

      <h1 className="d-none">About Us - {name}</h1>

      <div className="page-content">
        <div className="container pb-5">
          <section className="mt-10 pt-3">
            <h2 className="title title-center">ABOUT US</h2>
          </section>
          <section className="mt-10 pt-2">
            <p className="text-grey mb-2">
              Body Cupid is a premium and luxury bath and body range inspired by
              the belief that your body deserves as much tender loving care as
              your face does.
            </p>
          </section>
          <section className="pt-2">
            <p className="text-grey mb-2">
              You will agree that to feel truly beautiful, you need to look and
              feel good from tip to toe. That’s why, at Body cupid, we have
              created a wide range of truly excellent bath and body products –
              body scrubs, bath & shower gels, body butters, body polishes, bath
              salts, and moisturizers – that lovingly indulge, pamper and
              nurture your skin to make you feel extra special and extra
              radiant.
            </p>
          </section>
          <section className="pt-2">
            <p className="text-grey mb-2">
              Body Cupid fuses millennia-old holistic aromatherapeutic
              principles with modern botanical science to present a premium
              range of products that gently yet effectively heals the everyday
              damages unleashed by pollution and stress on your skin to restore
              wellness and glow. Every formulation comes enriched with purest,
              therapeutic grade essential oils and other premium botanicals that
              cleanse, refresh and relax you body, mind and soul. To ensure
              truly good and deeply nourishing products, we do not put any
              harmful parabens or sulphates or mineral oils in any of our
              formulations. We also do not indulge in animal testing and all our
              products are guaranteed vegetarian.
            </p>
          </section>
          <section className="pt-2">
            <p className="text-grey mb-2">
              There is another feature that makes Body Cupid extra special,
              extra desirable. Our products are made in an ultra-modern,
              quality-assured plant amidst pure and pristine environs of the
              Himalayas, the mightiest mountains in the world and nature’s
              tallest gift to the mankind. Think of it, not just the active
              ingredients, even the water and air that go in our products are
              utterly clean and totally pollution-free!
            </p>
          </section>
          <section className="pt-2">
            <p className="text-grey mb-2">
              Make Body Cupid a part of your everyday life and let it pamper you
              gently, lovingly, naturally!
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

export default connect(mapStateToProps)(React.memo(AboutUs));
