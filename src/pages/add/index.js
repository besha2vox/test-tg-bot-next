import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import axios from 'axios';

const Add = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, developers, qa } = e.target.elements;

        const { data } = await axios.post(
            'https://64a87eb0dca581464b85cca1.mockapi.io/projects',
            {
                projectName: name.value,
                freePositions: { developers: developers.value, qa: qa.value },
                openToDevelope: true,
            }
        );

        const { id } = data;

        const message =
            `Доступний для розробки новий проєкт: ${name.value}.` +
            `\nНеобхідна кількість учасників:` +
            `\n Developers: ${developers.value};` +
            `\n QA: ${qa.value}.` +
            `\n http://localhost:3000/project/${id}`;

        try {
            const response = await fetch('api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (response.ok) {
                console.log('Повідомлення надіслано');
            } else {
                console.error('Помилка при надсиланні повідомлення');
            }
        } catch (error) {
            console.error('Помилка при надсиланні повідомлення', error);
        }
    };

    return (
        <>
            <header>
                <nav className={styles.nav}>
                    <Link href="add">Add project</Link>
                    <Link href="profile">Profile</Link>
                    <Link href="projects">Projects</Link>
                </nav>
            </header>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                    fontSize: 20,
                    marginTop: 100,
                }}
            >
                <label
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}
                >
                    Project name
                    <input
                        style={{
                            fontSize: 20,
                            padding: '4px 8px',
                            maxWidth: 200,
                        }}
                        name="name"
                        type="name"
                    />
                </label>
                <label
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}
                >
                    developers
                    <input
                        style={{
                            fontSize: 20,
                            padding: '4px 8px',
                            maxWidth: 200,
                        }}
                        name="developers"
                        type="number"
                    />
                </label>
                <label
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}
                >
                    qa
                    <input
                        style={{
                            fontSize: 20,
                            padding: '4px 8px',
                            maxWidth: 200,
                        }}
                        name="qa"
                        type="number"
                    />
                </label>
                <button
                    style={{
                        fontSize: 20,
                        padding: '4px 8px',
                        maxWidth: 200,
                        cursor: 'pointer',
                    }}
                >
                    Add
                </button>
            </form>
        </>
    );
};

export default Add;
