import styles from './ListItem.module.css';
import ogs from 'open-graph-scraper-lite';

const ListItem = props => {
    const options = { url: 'http://ogp.me/' };
    ogs(options, { mode: 'cors' }).then(data => {
        const { error, result, response } = data;
        // console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
        console.log('result:', result); // This contains all of the Open Graph results
        // console.log('response:', response); // This contains the HTML of page
    });
    console.log('hey');
    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.title}>{props.title}</div>
                <a href={props.url} className={styles.url}>
                    {props.url}
                </a>
            </div>
            <div className={styles.rightContainer}>
                {/* <div>{props.date}</div> */}
                <div>{props.read}</div>
            </div>
        </div>
    );
};

export default ListItem;
