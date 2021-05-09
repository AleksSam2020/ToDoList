import { CreateIcon } from "../../../../base/icons";
import { Li, FilterTasksByDate } from "./helpers";

import styles from './styles.module.scss';

export function CreateList() {
  const ul = document.createElement('ul');

  ul.classList.add(styles.ul);

  const allTaskLi = Li({ content: 'All Tasks', clickEvent: FilterTasksByDate });
  const todayLi = Li({ content: 'Today', clickEvent: FilterTasksByDate });
  const weekLi = Li({ content: 'Week', clickEvent: FilterTasksByDate });
  const monthLi = Li({ content: 'Month', clickEvent: FilterTasksByDate });
  const yearLi = Li({ content: 'Year', clickEvent: FilterTasksByDate });

  todayLi.append(CreateIcon('fas fa-calendar-day'));
  weekLi.append(CreateIcon('fas fa-calendar-week'));
  monthLi.append(CreateIcon('fas fa-calendar-alt'));
  yearLi.append(CreateIcon('fas fa-calendar'));

  ul.append(allTaskLi, todayLi, weekLi, monthLi, yearLi)

  return ul;
}