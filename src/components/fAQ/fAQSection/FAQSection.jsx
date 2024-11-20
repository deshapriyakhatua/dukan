import React, { useState } from 'react'
import styles from './FAQSection.module.css'
import { IoIosArrowDown } from 'react-icons/io'

function FAQSection({ data }) {

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <div className={styles.mainSection}>
      <h1>{data.heading}</h1>
      <p>{data.shortText}</p>
      <div className={styles.qAContainer}>
        {data.faqs && data.faqs.map((elem, indx) => (
          <div>
            <div className={styles.qContainer} onClick={() => { setSelectedQuestion(selectedQuestion === elem.q ?null :elem.q); }}>
              <h2>{elem.q}</h2>
              <IoIosArrowDown className={`${styles.qIcon} ${selectedQuestion === elem.q && styles.rotateIcon}`} size={18}/>
            </div>
            {selectedQuestion && selectedQuestion === elem.q && (
              <p>{elem.a}</p>
            )}
          </div>

        ))}
      </div>
    </div>
  )
}

export default FAQSection