import { ReactNode } from "react";

interface Props {
    text: string;
    backgroundColor?: string;
    RightIcon?: ReactNode;
    LeftIcon?: ReactNode;
}

export const Button = ({ text, backgroundColor = "bg-yellow-300", RightIcon, LeftIcon }: Props) => {
    return (
        <button className={` py-3 px-6 rounded-full flex gap-2 items-center  ${backgroundColor}`}>
            {LeftIcon}
            <span className="font-general text-xs uppercase">
                <div>{text}</div>
            </span>
            {RightIcon}
        </button>
    )
}

export default Button