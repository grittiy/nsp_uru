
import React from "react";
import Item from "./Item";

type Props = {}

const Container = (props: Props) => {
    return (
        <div className="flex">
            <div className="px-20">
                <Item/>
            </div>
        </div>
    )
}

export default Container