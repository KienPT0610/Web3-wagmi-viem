import React from "react";
import ListBeatSaling from "./ListBeatSaling";
import ManageListBeat from "./ManageListBeat";
import UploadBeat from "./UploadBeat";

const Home = () => {
    return (
        <div>
            <h1> Home </h1>
            <div>
                <UploadBeat />
                <ManageListBeat />
                <ListBeatSaling />
            </div>
        </div>
    );
};

export default Home;