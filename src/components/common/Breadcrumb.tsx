import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";

function Breadcrumb({ routes }: { routes: { path: string; label: string }[] }) {
  const { locale } = useIntl();
  const navigate = useNavigate();

  const prevRoute = routes.length > 1 ? routes[routes.length - 2] : null;

  return (
    <div className="breadcrumb-container">
      <button
        disabled={!prevRoute}
        onClick={() =>
          prevRoute ? navigate(`/${locale}${prevRoute.path}`) : null
        }
        className="breadcrumb-back-button"
        aria-label="Go back"
      >
        <svg
          className="breadcrumb-back-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ul className="breadcrumb-list">
          {routes.map((item, index) => {
            const isLast = index === routes.length - 1;
            return (
              <li key={item.path} className="breadcrumb-item">
                {!isLast ? (
                  <>
                    <Link
                      to={`/${locale}${item.path}`}
                      className="breadcrumb-link"
                    >
                      {item.label}
                    </Link>
                    <svg
                      className="breadcrumb-separator"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </>
                ) : (
                  <span className="breadcrumb-current">{item.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Breadcrumb;
