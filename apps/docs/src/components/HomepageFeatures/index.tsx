import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: 'API Route Integration',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: <>Send emails directly from your frontend without a backend using integrated API routes.</>,
  },
  {
    title: 'Custom Templates',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: <>Personalize emails with branded templates for a memorable customer experience.</>,
  },
  {
    title: 'Effortless Authentication',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: <>Secure email delivery with API key authentication for authorized users.</>,
  },
]

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
