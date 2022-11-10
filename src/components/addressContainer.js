import React from "react";
import styles from "./addressContainer.module.css";

const AddressContainer = ({ address }) => {
  return (
    <div className={styles.address_container}>
      <p className={styles.address_container_text}>Address : {address}</p>
      <button
        className={styles.address_container_button}
        onClick={() => navigator.clipboard.writeText(address)}
      >
        Copy
      </button>
    </div>
  );
};

export default AddressContainer;
