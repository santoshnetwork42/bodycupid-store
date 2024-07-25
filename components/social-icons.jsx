import {
  FacebookHeaderIcon,
  InstagramHeaderIcon,
  PinterestHeaderIcon,
  TwitterHeaderIcon,
  YoutubeHeaderIcon,
} from "~/components/icons";

function SocialIcons({ store, fillColor }) {
  const { name, socialLinks } = store || {};
  return (
    <>
      {!!socialLinks?.facebook && (
        <a
          title={`${name} on Facebook`}
          href={socialLinks.facebook}
          className="header-social-icon"
          target={"_blank"}
        >
          <FacebookHeaderIcon color={fillColor} />
        </a>
      )}
      {!!socialLinks?.instagram && (
        <a
          title={`${name} on Instagram`}
          className="header-social-icon"
          href={socialLinks.instagram}
          target={"_blank"}
        >
          <InstagramHeaderIcon color={fillColor} />
        </a>
      )}
      {!!socialLinks?.pinterest && (
        <a
          title={`${name} on pinterest`}
          href={socialLinks.pinterest}
          className="header-social-icon"
          target={"_blank"}
        >
          <PinterestHeaderIcon color={fillColor} />
        </a>
      )}
      {!!socialLinks?.twitter && (
        <a
          title={`${name} on twitter`}
          href={socialLinks.twitter}
          className="header-social-icon"
          target={"_blank"}
        >
          <TwitterHeaderIcon color={fillColor} />
        </a>
      )}
      {!!socialLinks?.youtube && (
        <a
          title={`${name} on YouTube`}
          href={socialLinks.youtube}
          className="header-social-icon"
          target={"_blank"}
        >
          <YoutubeHeaderIcon color={fillColor} />
        </a>
      )}
    </>
  );
}

export default SocialIcons;
