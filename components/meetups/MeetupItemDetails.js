import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import {useRouter} from "next/router";

function MeetupItem(props) {
  
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.meetupItem.image} alt={props.meetupItem.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.meetupItem.title}</h3>
          <p>{props.meetupItem.address}</p>
          <p>{props.meetupItem.description}</p>
        </div>
        
      </Card>
    </li>
  );
}

export default MeetupItem;
