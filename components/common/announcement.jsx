import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import OwlCarousel from "../features/owl-carousel";
import { announcementSlider } from "~/utils/data/carousel";
import ALink from "../features/custom-link";

const Announcement = ({ store, showTopRunner }) => {
  const { announcements } = store || {};

  const router = useRouter();
  const { isReady } = router;

  const filteredAnnouncements =
    announcements?.filter((announcement) => !announcement.isArchive) || [];

  return (
    <div className="sticky-header">
      {!!showTopRunner &&
        isReady &&
        Array.isArray(filteredAnnouncements) &&
        !!filteredAnnouncements.length && (
          <OwlCarousel adClass="owl-nav-bottom" options={announcementSlider}>
            {filteredAnnouncements.map((announcement) => {
              const announcementStyle = {
                backgroundColor: announcement.color,
                color: announcement.textColor,
              };

              if (!announcement.link) {
                return (
                  <div
                    key={announcement.label}
                    className="announcement d-flex justify-content-center align-items-center w-full"
                    style={announcementStyle}
                  >
                    <p className="announcement-text font-weight-semi-bold pt-1 pb-1 m-0">
                      {announcement.label}
                    </p>
                  </div>
                );
              }

              return (
                <ALink href={announcement.link}>
                  <div
                    key={announcement.label}
                    className="announcement d-flex justify-content-center align-items-center w-full"
                    style={announcementStyle}
                  >
                    <p className="announcement-text font-weight-semi-bold pt-1 pb-1 m-0">
                      {announcement.label}
                    </p>
                  </div>
                </ALink>
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
