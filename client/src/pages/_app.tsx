import {AppProps} from "next/app";
import {SessionProvider} from "@inrupt/solid-ui-react";
import {Layout} from "antd";

const {Content} = Layout;

export default function SolidApp({Component, pageProps}: AppProps) {
    return <SessionProvider>
        <Layout style={{background: "transparent"}}>
            <Content>
                <Component {...pageProps} />
            </Content>
        </Layout>
    </SessionProvider>
}
