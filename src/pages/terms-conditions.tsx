const TermsConditions = () => {
  const DefinitionItem = ({ children }) => (
    <li className="definition-item">{children}</li>
  );

  return (
    <div className="container terms-conditions">
      <header className="header">
        <h1 className="main-title">Terms Of Services</h1>
        <p className="update-date">Updated on 14th January, 2024</p>
      </header>

      <section className="section-card">
        <h2 className="section-title">General Terms</h2>
        <p className="body-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim minim
          veniam, quis nostrud exercitation ullamco laboris nisi esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <p className="body-text no-margin">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim minim
          veniam, quis nostrud exercitation ullamco laboris nisi esse cillum
          dolore est laborum Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </p>
      </section>

      <section className="section-card">
        <h2 className="section-title">License</h2>
        <p className="body-text no-margin">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim minim
          veniam, quis nostrud exercitation ullamco laboris nisi esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </p>
      </section>

      <section className="section-card">
        <h2 className="section-title">Definitions and key terms</h2>
        <p className="body-text" style={{ textAlign: "left" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim minim
          veniam.
        </p>
        <ul className="definition-list">
          <DefinitionItem>
            Eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DefinitionItem>
          <DefinitionItem>
            Eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DefinitionItem>
          <DefinitionItem>
            Eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DefinitionItem>
          <DefinitionItem>
            Eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DefinitionItem>
        </ul>
      </section>

      <section className="section-card">
        <h2 className="section-title">Canceling</h2>
        <p className="body-text no-margin">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim minim
          veniam, quis nostrud exercitation ullamco laboris nisi esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </p>
      </section>
    </div>
  );
};

export default TermsConditions;
