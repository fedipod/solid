import {getSolidDataset, getStringNoLocale, getThing} from "@inrupt/solid-client";
import {VCARD} from "@inrupt/vocab-common-rdf";
import {useState} from "react";
import {Display} from "./Display";
import {useSession} from "@inrupt/solid-ui-react";
import {Button, Divider, Form, Input} from "antd";

// 3. Read profile
async function readProfile({webId, session}) {

    try {
        new URL(webId);
    } catch (error) {
        throw new Error(`Provided WebID [${webId}] is not a valid URL`);
    }

    const profileDocumentUrl = new URL(webId);
    profileDocumentUrl.hash = "";

    // Profile is public data; i.e., you do not need to be logged in to read the data.
    // For illustrative purposes, shows both an authenticated and non-authenticated reads.
    let myDataset;
    try {
        if (session.info.isLoggedIn) {
            myDataset = await getSolidDataset(profileDocumentUrl.href, {fetch: session.fetch});
        } else {
            myDataset = await getSolidDataset(profileDocumentUrl.href);
        }
    } catch (error) {
        throw new Error(`Entered value [${webId}] does not appear to be a WebID. Error: [${error}]`);
    }

    const profile = getThing(myDataset, webId);

    // Get the formatted name (fn) using the property identifier "http://www.w3.org/2006/vcard/ns#fn".
    // VCARD.fn object is a convenience object that includes the identifier string "http://www.w3.org/2006/vcard/ns#fn".
    // As an alternative, you can pass in the "http://www.w3.org/2006/vcard/ns#fn" string instead of VCARD.fn.

    const formattedName = getStringNoLocale(profile, VCARD.fn);

    // Update the page with the retrieved values.
    return `Read ${formattedName}`;
}

export function Read({webId}) {
    const {session} = useSession();
    const [display, setDisplay] = useState<string>("");

    const readFormOnFinish = (values) => {
        readProfile({
            session,
            webId: values.webId || webId
        })
            .then(setDisplay)
            .catch((error) => setDisplay(error.toString()));
    };

    return (<>
        <Divider orientation="left" plain>
            Read
        </Divider>
        <Form layout={"inline"} onFinish={readFormOnFinish}>
            <Form.Item label="Read back name (anyone's!) from their WebID" name={"webId"}>
                <Input type={"url"} placeholder={webId}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">Read Profile</Button>
            </Form.Item>
        </Form>
        <Display display={display}/>
    </>)

}