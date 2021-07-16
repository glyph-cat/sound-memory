import { MaterialIcon } from '~components/icon'
import styles from './index.module.css'

function PortionLocked(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <MaterialIcon
          name='lock'
          fill='#000000'
          size={100}
        />
        <span className={styles.label}>
          {'This card has not yet been solved'}
        </span>
      </div>
    </div>
  )
}

export default PortionLocked
