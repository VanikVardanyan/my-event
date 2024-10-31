import { PinkButton } from '@/shared/ui/button'
import styles from './styles.module.scss'
import { IPlacComponentsProps } from './types'

export const PlanComponent = (props: IPlacComponentsProps) => {
  const { title, description, buttonText } = props
  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.descriptions}>
        {description.map((item, index) => (
          <div key={index} className={styles.description}>
            <img src={item.image} alt="description" />
            <div className={styles.description_text}>{item.description}</div>
          </div>
        ))}
      </div>
      <div className={styles.button}>
        <PinkButton>{buttonText}</PinkButton>
      </div>
    </div>
  )
}
