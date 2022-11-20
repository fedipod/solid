import {Descriptions} from "antd";

export function Display({display}) {
    if (!display) {
        display = "...nothing here yet..."
    }

    return <Descriptions>
        <Descriptions.Item label="Status">{display}</Descriptions.Item>
    </Descriptions>
}