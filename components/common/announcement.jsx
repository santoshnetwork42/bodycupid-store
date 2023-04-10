import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import OwlCarousel from "../features/owl-carousel";
import { announcementSlider } from "~/utils/data/carousel";

const Announcement = ({ store }) => {
  const { announcements = [] } = store;
  const router = useRouter();
  const { isReady } = router;
  return (
    <>
      {isReady && (
        <div className="announcement-bar">
          <OwlCarousel adClass="owl-nav-bottom" options={announcementSlider}>
            {announcements.map((announcement, index) => {
              return (
                <div
                  key={index}
                  className="announcement testimonial d-flex justify-content-center"
                >
                  <p className="announcement-text m-0">{announcement}</p>
                </div>
              );
            })}
          </OwlCarousel>
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

export default connect(mapStateToProps)(Announcement);
