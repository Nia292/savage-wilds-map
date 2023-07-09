import React, {MouseEvent} from "react";

export interface InfoDialogProps {
    contributors: string[];
    open: boolean;

    onClose(): void;
}

export const InfoDialog = (props: InfoDialogProps) => {
    function preventClose(event: MouseEvent) {
        const name = (event.target as any).tagName;
        if (name !== "A") {
            event.preventDefault();
        }
        event.stopPropagation();
    }

    if (!props.open) {
        return <React.Fragment/>
    }
    return <div className="dialog-container" onClick={props.onClose}>
        <div className="dialog" onClick={preventClose}>
            <div className="dialog-header">
                Information
            </div>
            <div className="dialog-subheader">
                About
            </div>
            <div>
                A work in progess map of <a href="https://www.savagewilds.com/">Savage Wilds</a> that contains various
                points of interest, feats, resources and other information about the mod.
                <br/>
                Check out the mod page for more information.
            </div>
            <div className="dialog-subheader">
                Privacy
            </div>
            <div>
                This site does not track your information. <br/>
                This site does not use cookies. <br/>
                This site does not store data on your local device aside from normal browser caching. <br/>
                Site provided by&nbsp;<a target="_blank" href="https://pages.github.com/" rel="noreferrer">GitHub
                pages</a>. Check out&nbsp;<a target="_blank"
                                             href="https://docs.github.com/en/github/site-policy/github-privacy-statement"
                                             rel="noreferrer">GitHub's privacy statement</a>
                &nbsp;to find out what data GitHub collects.
            </div>
            <div className="dialog-subheader">
                Contributing
            </div>
            <div>
                This map is far from completed. Feel free to DM me on discord (@nia2424) or <a href="https://github.com/Nia292/savage-wilds-map/issues/new">Create a GitHub Issue</a> to contribute!
                <br/>
                <br/>
                Pull requests are also appreciated and will be accepted.
                <br/>
                <br/>
                If you contribute, please provide the following details:
                <ul>
                    <li>A TeleportToPlayer command with the coordinates</li>
                    <li>A brief description of the location</li>
                    <li>If you want to be mentioned below as contributor, a name to list you with</li>
                </ul>
            </div>
            <div className="dialog-subheader">
                More
            </div>
            <div className="dialog-subheader">
                Credits
            </div>
            <div>
                <strong>Funcom</strong> for Conan Exiles and the map!<br/>
                <strong>Savage Wilds</strong> mod for the Savage Wilds map! <br/>
            </div>
            <div className="dialog-subheader">
                Contributors
            </div>
            <div className="display-in-column">
                {props.contributors.map(value => <div key={value}>{value}</div>)}
            </div>
        </div>
    </div>
}
