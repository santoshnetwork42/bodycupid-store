import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import OwlCarousel from "../features/owl-carousel";
import { announcementSlider } from "~/utils/data/carousel";

const Announcement = ({ store, showTopRunner }) => {
  const { announcements } = store || {};
  const router = useRouter();
  const { isReady } = router;
  if (!showTopRunner) return <></>;
  return (
    <>
      {isReady && Array.isArray(announcements) && !!announcements.length && (
        <div className="announcement-bar">
          <OwlCarousel adClass="owl-nav-bottom" options={announcementSlider}>
            {announcements.map((announcement) => {
              return (
                <div
                  key={announcement}
                  className="announcement d-flex justify-content-center align-items-center"
                >
                  <p className="announcement-text pt-1 pb-1 m-0">
                    {announcement}
                  </p>
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
