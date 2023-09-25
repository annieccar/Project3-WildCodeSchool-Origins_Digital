import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  InstapaperShareButton,
  InstapaperIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const originsDigitalURL = "https://www.origins-digital.com";
export default function SharePopUp({ videoInfos }) {
  const currentVideoURLPath = useLocation().pathname;
  return (
    <div className="bg-dark px-5 py-3 rounded-md flex flex-col gap-2 items-center absolute z-50 top-1/3 ">
      <p className="text-orange">{videoInfos.name}</p>
      <p>Share this video :</p>
      <div className="flex gap-2">
        <FacebookShareButton
          url={`${originsDigitalURL}${currentVideoURLPath}`}
          quote="Check out this awesome video ! "
          hashtag={`#${videoInfos.name}`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          title={`${videoInfos.name}`}
          url={`${originsDigitalURL}${currentVideoURLPath}`}
          via=""
          hashtags={[`#${videoInfos.name}`, "#origins-digital"]}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <InstapaperShareButton
          title={`${videoInfos.name}`}
          url={`${originsDigitalURL}${currentVideoURLPath}`}
          description={`${videoInfos.details}`}
        >
          <InstapaperIcon size={32} round />
        </InstapaperShareButton>
        <EmailShareButton
          url={`${originsDigitalURL}${currentVideoURLPath}`}
          subject={`${videoInfos.name} is trending on Origins Digital !`}
          body={`${videoInfos.details}`}
          separator={`\n \n Watch ${videoInfos.name}, exclusively on Origins Digital !\n \n`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
}

SharePopUp.propTypes = {
  videoInfos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    category_id: PropTypes.number,
  }).isRequired,
};
