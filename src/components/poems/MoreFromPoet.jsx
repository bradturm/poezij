import styles from "../../css/Poems.module.css";

function MoreFromPoet(props) {




    return (
        <>
            {props.moreFrom &&
                <div className={`${styles.more_from_poet}`}>
                    <p><b>More from {props.poet}</b></p>
                    <p>Another poem from Meindert</p>
                    <p>Another poem from Meindert</p>
                    <p>Another poem from Meindert</p>
                    <p>Another poem from Meindert</p>
                </div>}
        </>
    )
}


export default MoreFromPoet;