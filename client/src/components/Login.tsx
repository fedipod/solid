import {useEffect, useState} from "react";
import {Write} from "./Write";
import {Read} from "./Read";
import {LoginButton, LogoutButton, useSession} from "@inrupt/solid-ui-react";
import getConfig from 'next/config'
import {Button, Divider, Dropdown, Space} from "antd";

const {publicRuntimeConfig} = getConfig()

function LabelStatus({webId}) {
    if (!webId) {
        return <></>
    }
    return <p className="labelStatus">Your session is logged in with the WebID
        [<a target="_blank" href={webId}>{webId}</a>].
    </p>;
}

export function Login() {
    const {session} = useSession();
    const [currentUrl, setCurrentUrl] = useState("");

    function reload() {
        globalThis.location.reload()
    }

    const items = publicRuntimeConfig.oidcIssuer.split(",").map((value, index) => {
        return {
            key: String(index),
            label: String(value),
        }
    });

    const [idp, setIdp] = useState(items[0].label);

    useEffect(() => {
        setCurrentUrl(globalThis.location.href);
    }, [setCurrentUrl]);

    const onMenuClick = (event) => {
        setIdp(items.find(value => value.key === event.key).label);
    };

    return (
        <>
            <Divider orientation="left" plain>
                Login
            </Divider>
            <Space wrap>
                Click the button to log into <Dropdown.Button onClick={()=>{console.log("123")}} menu={{items, onClick: onMenuClick}}>{idp}</Dropdown.Button>
                <LoginButton
                    authOptions={{clientName: "Inrupt tutorial client app"}}
                    oidcIssuer={idp}
                    redirectUrl={currentUrl}
                    onError={console.error}
                >
                    <Button>Log In</Button>
                </LoginButton>
                <LogoutButton onLogout={reload}>
                    <Button>Log Out</Button>
                </LogoutButton>
            </Space>
            <LabelStatus webId={session.info.webId}/>
            <Write webId={session.info.webId}/>
            <Read webId={session.info.webId}/>
        </>)
}