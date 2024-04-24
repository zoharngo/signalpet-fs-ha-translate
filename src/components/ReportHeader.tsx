import { useCallback, useRef } from 'react';
import { loadingText, reportHeader } from '../utils/constants';
import { findTranslatedTags } from '../utils/elements';
import { useState } from 'react';

const styles = {
  container: {
    backgroundColor: '#064c60',
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    padding: '1rem',
    width: '100%',
  },
  logo: {
    width: '10rem',
  },
  secondaryText: {
    color: '#fff',
  },
  selectBox: {
    backgroundColor: '#064c60',
    border: '1px solid #fff',
    borderRadius: '0.25rem',
    color: '#fff',
    padding: '0.5rem',
    width: '10rem',
  },
};

const ReportHeader = () => {
  const [isloading, setIsLoading] = useState(false);
  const enLanguage = useRef<Array<string | null>>([]);

  const changeLanguage = useCallback(async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const selectedLanguage = event.target.value;
    const translation = findTranslatedTags();
    if (enLanguage.current.length === 0) {
      enLanguage.current = translation.map((tag) => tag.textContent);
      console.log(enLanguage.current);
    }
    if (selectedLanguage === 'en') {
      const translation = findTranslatedTags();
      translation.forEach((tag, index) => {
        tag.textContent = enLanguage.current[index];
      });
      setIsLoading(false);
      return;
    }
    const response = await fetch('http://localhost:3001/translator/report', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: enLanguage.current,
        targetLanguage: selectedLanguage,
      }),
    });
    const data = await response.json();
    translation.forEach((tag, index) => {
      tag.textContent = data.translatedText[index];
    });
    setIsLoading(false);
  }, []);
  return (
    <>
      <div style={styles.container}>
        <img alt='Logo' src={require('../static/logo.png')} style={styles.logo} />
        <span style={styles.secondaryText} translate='yes'>
          {reportHeader.secondaryText}
        </span>
        <select defaultValue='en' style={styles.selectBox} onChange={changeLanguage}>
          <option value='en'>English</option>
          <option value='es'>Spanish</option>
          <option value='de'>German</option>
          <option value='fr'>French</option>
          <option value='pt'>Portuguese</option>
        </select>
      </div>
      {isloading && <span style={styles.secondaryText}>{loadingText}</span>}
    </>
  );
};

export default ReportHeader;
