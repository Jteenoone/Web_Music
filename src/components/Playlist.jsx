import jack from '../assets/images/j97.jpg';
import { Item } from './Item';

export default function Playlist({content}) {
    return(
        <div>
            <div>
                <img></img>
                <div>
                    <h4>Public Playlist</h4>
                    <h2>{content ? content : 'Loading..'}</h2>
                </div>
            </div>
            <div>
                <button>Play</button>
            </div>
            <div>
                <table>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Album</th>
                        <th>Time</th>
                    </tr>
                    {/* demo data */}
                    <tr>
                        <th>1</th>
                        <th><Item srcImg={jack} nameSong='Dom Dom' nameSinger='Jack'/></th>
                        <th>Dom Dom</th>
                        <th>5:11</th>
                    </tr>
                </table>
            </div>
        </div>
    );
}
