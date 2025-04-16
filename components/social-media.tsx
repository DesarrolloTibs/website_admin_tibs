
interface SocialMediaPrps {
    widthStyle: string;
}

export default function SocialMedia({ widthStyle }: SocialMediaPrps) {

    return (
        <>
            <svg className={`cursor-pointer ${widthStyle} group`} onClick={() => window.open("https://www.facebook.com/tibsoficial", "_blank")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                <path className="fill-[#cbcbcb] group-hover:fill-[#0866ff] duration-500" d="M275,150c0,69.04-55.96,125-125,125h0c-69.04,0-125-55.96-125-125h0c0-69.04,55.96-125,125-125h0c69.04,0,125,55.96,125,125h0Z"/>
                <path className="fill-[#fff]" d="M187.04,140.3l-2.08,16.72c-.35,2.8-2.72,4.9-5.52,4.9h-27.08v69.92c-2.86.26-5.75.39-8.68.39-6.54,0-12.93-.66-19.1-1.9v-68.41h-20.83c-1.91,0-3.47-1.57-3.47-3.49v-20.92c0-1.92,1.56-3.49,3.47-3.49h20.83v-31.38c0-19.26,15.55-34.87,34.73-34.87h24.3c1.91,0,3.47,1.57,3.47,3.49v20.92c0,1.92-1.56,3.49-3.47,3.49h-17.36c-7.67,0-13.89,6.24-13.89,13.95v24.41h29.17c3.35,0,5.94,2.95,5.52,6.28Z"/>
            </svg>

            <svg className={`cursor-pointer ${widthStyle} group`} onClick={() => window.open('https://twitter.com/Tibs_mx', "_blank")} id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300">
                <path className="fill-[#cbcbcb] group-hover:fill-[#0F1419] duration-500" d="M275,150c0,69.04-55.96,125-125,125h0c-69.04,0-125-55.96-125-125h0c0-69.04,55.96-125,125-125h0c69.04,0,125,55.96,125,125h0Z"/>
                <path className="fill-[#fff]" d="M168.04,138.52l50.57-54.08h-19.2l-39.69,42.45-30.39-42.45h-52.52l53.17,74.27-53.17,56.87h19.2l42.29-45.24,32.38,45.24h52.52l-55.16-77.05ZM103.86,98.34h18.31l73.97,103.32h-18.31l-73.97-103.32Z"/>
            </svg>

            <svg className={`cursor-pointer ${widthStyle} group`} onClick={() => window.open("https://www.linkedin.com/company/tibs-mx/?viewAsMember=true", "_blank")} id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300">
                <path className="fill-[#cbcbcb] group-hover:fill-[#0a66c2] duration-500" d="M275,151.43c0,69.04-55.96,125-125,125h0c-69.04,0-125-55.96-125-125h0c0-69.04,55.96-125,125-125h0c69.04,0,125,55.96,125,125h0Z"/>
                <circle className="fill-[#fff]" cx="105.73" cy="101.91" r="16.1"/>
                <rect className="fill-[#fff]" x="92.31" y="128.74" width="26.83" height="80.5" rx=".29" ry=".29"/>
                <path className="fill-[#fff]" d="M210.37,158.26v45.62c0,2.95-2.42,5.37-5.37,5.37h-16.1c-2.95,0-5.37-2.42-5.37-5.37v-37.57c0-7.41-6.01-13.42-13.42-13.42s-13.42,6.01-13.42,13.42v37.57c0,2.95-2.42,5.37-5.37,5.37h-16.1c-2.95,0-5.37-2.42-5.37-5.37v-69.76c0-2.95,2.42-5.37,5.37-5.37h16.1c2.95,0,5.37,2.41,5.37,5.37v3.43c5.37-6.95,14.25-11.48,24.15-11.48,14.81,0,29.52,10.73,29.52,32.2Z"/>
            </svg>

            <svg className={`cursor-pointer ${widthStyle} group`} onClick={() => window.open('https://www.youtube.com/channel/UC0Go6ms9iJTeSTFW9jrKWfQ?view_as=subscriber', "_blank")} id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300">
                <path className="fill-[#cbcbcb] group-hover:fill-[#ff0033] duration-500" d="M275,150c0,69.04-55.96,125-125,125h0c-69.04,0-125-55.96-125-125h0c0-69.04,55.96-125,125-125h0c69.04,0,125,55.96,125,125h0Z"/>
                <path className="fill-[#fff]" d="M203.87,97.04h-107.74c-10.65,0-19.28,8.63-19.28,19.27v67.39c0,10.65,8.63,19.27,19.28,19.27h107.74c10.64,0,19.27-8.63,19.27-19.27v-67.39c0-10.64-8.63-19.27-19.27-19.27ZM167.31,154.65l-29.96,14.97c-3.46,1.73-7.53-.78-7.53-4.64v-29.95c0-3.86,4.07-6.38,7.53-4.65l29.96,14.98c3.83,1.91,3.83,7.38,0,9.29Z"/>
            </svg>
        </>
    )
}
