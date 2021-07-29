import React from "react";
import { Badge, BellIcon, BoxIcon, CakeIcon, CashIcon, EditIcon, StackIcon } from "../..";

const BadgeStories = {
    title: "Data Display/Badges",
    component: Badge,
    args: {
        text: "Default",
        color: "primary",
        size: "small",
    },
    argTypes: {
        text: {
            type: { required: true },
            control: { type: "text" },
        },
        color: {
            options: ["primary", "secondary", "success", "warning", "caution", "danger", "critical"],
            control: { type: "select" },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "inline-radio" },
        },
    },
};

export const Default = ({ text = "Default", color, size, className }) => {
    return (
        <div className="space-x-4">
            <Badge className={className} color={color} size={size}>
                {text}
            </Badge>
        </div>
    );
};

export const WithIcons = () => {
    return (
        <div className="grid grid-cols-5 gap-4">
            <Badge color="primary" icon={<StackIcon />}>
                Primary
            </Badge>
            <Badge color="secondary" icon={<EditIcon />}>
                Secondary
            </Badge>
            <Badge color="success" icon={<BoxIcon />}>
                Success
            </Badge>
            <Badge color="warning" icon={<BellIcon />}>
                Warning
            </Badge>
            <Badge color="caution" icon={<CashIcon />}>
                Caution
            </Badge>
            <Badge color="danger" icon={<CakeIcon />}>
                Danger
            </Badge>
            <Badge color="critical" icon={<StackIcon />}>
                Critical
            </Badge>
        </div>
    );
};

export const Colors = () => {
    return (
        <div className="space-x-4">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="caution">Caution</Badge>
            <Badge color="danger">Danger</Badge>
            <Badge color="critical">Critical</Badge>
        </div>
    );
};

export const AllSizes = () => {
    return (
        <div className="space-x-4">
            <Badge size="small">Small</Badge>

            <Badge size="medium" icon={<StackIcon />}>
                A Medium One
            </Badge>

            <Badge size="large" icon={<EditIcon />}>
                A Large One
            </Badge>
        </div>
    );
};

export default BadgeStories;
