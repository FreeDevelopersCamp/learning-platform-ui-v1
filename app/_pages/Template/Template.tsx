import { PropsWithChildren } from "react";

interface Props { }
const Template = ({ children, ...rest }: PropsWithChildren<Props>) => {
    return <div>{children}</div>;
};

export default Template;
