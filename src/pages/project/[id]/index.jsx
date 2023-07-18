import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Project = () => {
    const [project, setProject] = useState({});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                'https://64a87eb0dca581464b85cca1.mockapi.io/projects/1'
            );
            setProject(data);
        })();
    }, []);

    const freePositions = (() => {
        try {
            return Object.entries(project?.freePositions);
        } catch (error) {
            return [];
        }
    })();

    return (
        <>
            <header>
                <nav className={styles.nav}>
                    <Link href="add">Add project</Link>
                    <Link href="profile">Profile</Link>
                    <Link href="projects">Projects</Link>
                </nav>
            </header>
            <div>
                <h2>Project name: {project.projectName}</h2>
                <Image
                    width="300"
                    height="200"
                    src={project.image}
                    alt="preview"
                />
                {!!freePositions.length && (
                    <ul>
                        {freePositions.map(([key, value]) => (
                            <li key={key}>
                                <p>
                                    {key}: <span>{value}</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Project;
