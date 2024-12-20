'use client'
import { CategoryTitle } from '../../../shared/ui/category-title'
import { Container } from '../styles'
import useStyles from './styles'

const About = () => {
  const { classes } = useStyles()

  return (
    <>
      <Container>
        <CategoryTitle title="Մեր մասին" />
        <div className={classes.content}>
          <div className={classes.description}>
            <div>
              Evneasy-ը հարթակ է, որը դյուրացնում է ցանկացած միջոցառման կազմակերպման գործընթացը։ Մենք կապում ենք
              հաճախորդներին որակավորված մատակարարների լայն ցանցի հետ՝ հնարավորություն տալով պարզ ու հարմար ձևով
              կազմակերպել միջոցառումներ՝ սկսած շոումենից և ձևավորման պարագաներից, մինչև վարձույթ, լուսանկարիչներ և այլ
              ծառայություններ։ Մեր նպատակը միջոցառումների պլանավորումը դարձնել պարզ, արդյունավետ և հաճելի։
            </div>
            <div className={classes.main}>
              Evneasy-ն առաջարկում է միջոցառման պլանավորման գործիքներ, որոնք թույլ են տալիս կառավարել ձեր միջոցառման
              մանրամասները՝ ձեր իսկ տեսլականի համաձայն։ Ցանկացած տարեդարձից կամ կորպորատիվ միջոցառումից մինչև հարսանիք՝
              մենք այստեղ ենք՝ ձեր կողքին, ապահովելու, որ միջոցառումը լինի հիանալի և անմոռանալի։
            </div>
            <div>Մեզ հետ պլանավորեք, վստահեք մեզ, և մենք ձեր միջոցառումը կդարձնենք անթերի ու հիշվող:</div>
          </div>
        </div>
      </Container>
      <div className={classes.goal}>
        <div>
          <h3 className={classes.goalTitle}>Մեր տեսլականը</h3>
          <div className={classes.goalDescription}>
            Մենք ձգտում ենք դառնալ լավագույն միջոցառումների կազմակերպման հարթակը՝ ապահովելով որակյալ մատակարարների մեծ
            ընտրանի, պարզ պլանավորման գործիքներ և հաճախորդների անհատական մոտեցում՝ դարձնելով Evneasy-ն միջոցառումների
            կազմակերպման առաջին ընտրությունը։
          </div>
        </div>
        <div>
          <h3 className={classes.goalTitle}>Մեր առաքելությունը</h3>
          <div className={classes.goalDescription}>
            Մեր առաքելությունն է ստեղծել պարզ, հարմարավետ և պրոֆեսիոնալ հարթակ, որտեղ հաճախորդներն ու մասնագետները կարող
            են համագործակցել՝ միջոցառումները պլանավորելով և կազմակերպելով նոր մակարդակի որակով ու հարմարավետությամբ։
          </div>
        </div>
      </div>
      <Container>
        <h3 className={classes.footerTitle}>Մեր նպատակները</h3>
        <div className={classes.footerItem}>
          Մատակարարների լայն ցանցի ստեղծում՝ ներգրավելով լավագույն մասնագետներին՝ սկսած շոումեններից մինչև դիզայներներ։
        </div>
        <div className={classes.footerItem}>
          Հաճախորդների գոհունակության բարձրացում՝ ապահովելով հարմարավետ օգտագործում և լիարժեք աջակցություն։
        </div>
        <div className={classes.footerItem}>
          Նորարարական պլանավորման գործիքների զարգացում՝ հաճախորդներին տրամադրելով միջոցառումները արդյունավետորեն
          կազմակերպելու հնարավորություններ։
        </div>
        <div className={classes.footerItem}>
          Աճել միջազգային շուկաներում, ընդլայնել մեր ծառայությունները և հասանելի լինել նոր երկրներում՝ դարձնելով
          միջոցառումների կազմակերպումը հասանելի ավելի լայն լսարանին։
        </div>
      </Container>
    </>
  )
}

export default About
