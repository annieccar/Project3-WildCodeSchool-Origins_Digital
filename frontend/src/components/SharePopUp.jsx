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
export default function SharePopUp({ videoInfos, close }) {
  const currentVideoURLPath = useLocation().pathname;
  return (
    <>
      <button
        type="button"
        aria-label="close"
        className="fixed inset-0"
        onClick={close}
      />
      <div className="min-w-[20rem] min-h-[12rem] bg-lightBlue dark:bg-dark border-2 border-orange px-5 py-3 font-primary rounded-lg flex flex-col gap-2 items-center justify-center absolute z-30 top-1/3 left-1/2 -translate-x-1/2">
        <p className="text-orange font-bold text-xl">{videoInfos.name}</p>
        <p className="text-white font-bold text-lg">Share this video :</p>
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
    </>
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
  close: PropTypes.func.isRequired,
};
