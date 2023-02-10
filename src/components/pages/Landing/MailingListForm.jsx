import { useState } from 'react';

import Styles from './MailingListForm.module.css';

const MailingListForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className={Styles["mailing-list"]}>
            <div className={Styles["mailing-list-wrapper"]}>
                <div className={Styles["mailing-list-form-wrapper"]}>
                    <h2>Join Our Mailing List</h2>
                    <form className={Styles["mailing-list-form"]} method="post">
                        <label for="name">Name</label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Name"
                            type="name"
                            name="name"
                            id="name"
                            required
                        />
                        <label for="email">Email</label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="example@example.com"
                            type="email"
                            name="email"
                            id="email"
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MailingListForm;