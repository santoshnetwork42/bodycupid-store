import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import OwlCarousel from "../features/owl-carousel";
import { announcementSlider } from "~/utils/data/carousel";

const Announcement = ({ store, showTopRunner }) => {
  const { announcements } = store || {};
  const router = useRouter();
  const { isReady } = router;

  return (
    <div className="announcement-bar sticky-header">
      {!!showTopRunner &&
        isReady &&
        Array.isArray(announcements) &&
        !!announcements.length && (
          <OwlCarousel adClass="owl-nav-bottom" options={announcementSlider}>
            {announcements.map((announcement) => {
              return (
                <div
                  key={announcement}
                  className="announcement d-flex justify-content-center align-items-center"
                >
                  <p className="announcement-text font-weight-semi-bold pt-1 pb-1 m-0">
                    {announcement}
                  </p>
                </div>
              );
            })}
          </OwlCarousel>
        )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

export default connect(mapStateToProps)(Announcement);
