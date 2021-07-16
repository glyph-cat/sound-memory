import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './index.module.css'

export type FormSheetProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export function FormSheet(props: FormSheetProps): JSX.Element {
  const { children, className, ...otherProps } = props
  return (
    <div className={[styles.container, className].join(' ')} {...otherProps}>
      {children}
    </div>
  )
}
