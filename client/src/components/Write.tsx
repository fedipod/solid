import {getSolidDataset, getThing, saveSolidDatasetAt, setStringNoLocale, setThing} from "@inrupt/solid-client";
import {VCARD} from "@inrupt/vocab-common-rdf";
import {useState} from "react";
import {Display} from "./Display";
import {useSession} from "@inrupt/solid-ui-react";
import {Button, Divider, Form, Input} from "antd";

// 2. Write to profile
async function writeProfile({webId, name, session}) {

    if (!name) throw new Error(`There is no input value`);

    try {
        new URL(webId);
    } catch (error) {
        throw new Error(`Provided WebID [${webId}] is not a valid URL`);
    }

    const webID = session.info.webId;
    // The WebID can contain a hash fragment (e.g. `#me`) to refer to profile data
    // in the profile dataset. If we strip the hash, we get the URL of the full
    // dataset.
    const profileDocumentUrl = new URL(webID);
    profileDocumentUrl.hash = "";

    // To write to a profile, you must be authenticated. That is the role of the fetch
    // parameter in the following call.
    let myProfileDataset = await getSolidDataset(profileDocumentUrl.href, {
        fetch: session.fetch
    });

    // The profile data is a "Thing" in the profile dataset.
    let profile = getThing(myProfileDataset, webID);

    // Using the name provided in text field, update the name in your profile.
    // VCARD.fn object is a convenience object that includes the identifier string "http://www.w3.org/2006/vcard/ns#fn".
    // As an alternative, you can pass in the "http://www.w3.org/2006/vcard/ns#fn" string instead of VCARD.fn.
    profile = setStringNoLocale(profile, VCARD.fn, name);

    // Write back the profile to the dataset.
    myProfileDataset = setThing(myProfileDataset, profile);

    // Write back the dataset to your Pod.
    await saveSolidDatasetAt(profileDocumentUrl.href, myProfileDataset, {
        fetch: session.fetch
    });

    return `Wrote ${name}`;

}


export function Write({webId}) {
    const {session} = useSession();
    const [display, setDisplay] = useState<string>("");

    const writeFormOnFinish = (values) => {
        writeProfile({
            ...{webId, session},
            ...values
        })
            .then(setDisplay)
            .catch((error) => setDisplay(error.toString()));
    };

    return (<>
        <Divider orientation="left" plain>
            Write
        </Divider>
        <Form layout={"inline"} onFinish={writeFormOnFinish}>
            <Form.Item label="Write your name" name={"name"}>
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">Write to Profile</Button>
            </Form.Item>
        </Form>
        <Display display={display}/>
    </>)
}