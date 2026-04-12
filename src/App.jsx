import { createSignal, For, Show } from "solid-js";
import "./App.css";

const documents = [
  {
    name: "Transcript of Records",
    desc: "Official academic records",
    price: 150,
  },
  {
    name: "Diploma Copy",
    desc: "Certified true copy",
    price: 200,
  },
  {
    name: "Certificate of Enrollment",
    desc: "Proof of enrollment",
    price: 150,
  },
  {
    name: "Good Moral Certificate",
    desc: "Character certificate",
    price: 200,
  },
  {
    name: "Other",
    desc: "Specify your document",
    price: null,
  },
];

const historyItems = [
  {
    title: "Transcript (TOR)",
    code: "ALM-2026-0001",
    status: "Processing",
    payment: "Gcash",
    amount: "PHP 500",
    date: "Feb 20, 2026",
  },
  {
    title: "Diploma",
    code: "ALM-2026-00712",
    status: "In Transit",
    payment: "BDO",
    amount: "PHP 650",
    date: "Feb 14, 2026",
  },
  {
    title: "Transcript (TOR)",
    code: "ALM-2026-04231",
    status: "Delivered",
    payment: "Maya",
    amount: "PHP 350",
    date: "Dec 3, 2026",
  },
];

function Sidebar(props) {
  const items = [
    "Dashboard",
    "Profile",
    "Select Document",
    "Schedule",
    "Review",
    "Tracker",
    "History",
  ];

  return (
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-logo">UP</div>
        <div class="brand-copy">
          <h2>University Portal</h2>
          <p>Document Request System</p>
        </div>
      </div>

      <nav class="nav-menu">
        <button class="nav-item" onClick={() => props.setScreen("Login")}>
          Login
        </button>

        <For each={items}>
          {(item) => (
            <button
              class={`nav-item ${props.screen() === item ? "active" : ""}`}
              onClick={() => props.setScreen(item)}
            >
              {item}
            </button>
          )}
        </For>
      </nav>
    </aside>
  );
}

function TopBar(props) {
  return (
    <header class="topbar">
      <div class="topbar-copy">
        <h1>{props.title}</h1>
        <p>{props.subtitle}</p>
      </div>

      <div class="topbar-avatar">RS</div>
    </header>
  );
}

function LoginPage(props) {
  return (
    <div class="login-page">
      <div class="login-card">
        <div class="login-card-top">
          <div class="login-logo">UP</div>
          <h1>University Portal</h1>
          <p>Document Request System</p>
        </div>

        <div class="login-card-body">
          <h2>ALUMNI</h2>

          <label>Select Role</label>
          <div class="role-grid">
            <button class="role-btn active">Alumni</button>
            <button class="role-btn">Staff</button>
          </div>

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button
            class="primary-btn full-btn"
            onClick={() => props.setScreen("Dashboard")}
          >
            Login
          </button>

          <div class="login-links">
            <a href="#">Forgot Password?</a>
            <p>
              Don't have an account? <a href="#">Create Account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage(props) {
  return (
    <div class="page">
      <TopBar title="Welcome Back!" subtitle="Ruvic Santos" />

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon yellow">◌</div>
          <h3>0</h3>
          <p>Pending</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon blue">✓</div>
          <h3>1</h3>
          <p>Approved</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon green">📄</div>
          <h3>1</h3>
          <p>Ready</p>
        </div>
      </div>

      <button
        class="primary-btn full-btn"
        onClick={() => props.setScreen("Select Document")}
      >
        Request Document
      </button>

      <div class="feature-grid">
        <div class="feature-card">
          <div>
            <h3>My Requests</h3>
            <p>Track your documents</p>
          </div>
          <span>›</span>
        </div>

        <div class="feature-card">
          <div>
            <h3>Appointment Schedule</h3>
            <p>View your booking</p>
          </div>
          <span>›</span>
        </div>
      </div>

      <div class="how-card">
        <h3>How it works</h3>
        <ul>
          <li>Select your required document</li>
          <li>Schedule an appointment to avoid queues</li>
          <li>Track your request status in real-time</li>
          <li>Pick up when ready</li>
        </ul>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div class="page">
      <TopBar title="My Profile" subtitle="Profile Information" />

      <section class="main-card profile-card">
        <div class="profile-hero">
          <div class="profile-avatar">RS</div>

          <div class="profile-center">
            <h2>Ruvic Santos</h2>
            <span class="pill">Alumni</span>
          </div>
        </div>

        <div class="divider" />

        <div class="section-block">
          <h3>Account Information</h3>

          <div class="info-row">
            <span>Email</span>
            <strong>rvsantos@gmail.com</strong>
          </div>

          <div class="info-row">
            <span>Student ID</span>
            <strong>2022-012345</strong>
          </div>

          <div class="info-row">
            <span>Account Type</span>
            <strong>Alumni Account</strong>
          </div>
        </div>

        <div class="divider" />

        <div class="section-block">
          <h3>Quick Information</h3>
          <div class="quick-link">
            <span>My Request</span>
            <strong>›</strong>
          </div>
        </div>

        <div class="divider" />

        <button class="danger-btn">Logout</button>
      </section>
    </div>
  );
}

function SelectDocumentPage(props) {
  return (
    <div class="page">
      <TopBar
        title="Select Document"
        subtitle="Choose the document you need to request"
      />

      <section class="main-card">
        <div class="doc-list">
          <For each={documents}>
            {(doc) => (
              <button
                class={`doc-item ${props.selectedDoc().name === doc.name ? "selected" : ""}`}
                onClick={() => props.setSelectedDoc(doc)}
              >
                <div class="doc-left">
                  <div class="doc-icon">📄</div>
                  <div>
                    <h3>{doc.name}</h3>
                    <p>{doc.desc}</p>
                  </div>
                </div>

                <Show when={doc.price}>
                  <strong>₱{doc.price}</strong>
                </Show>
              </button>
            )}
          </For>
        </div>

        <button
          class="primary-btn full-btn"
          onClick={() => props.setScreen("Schedule")}
        >
          Continue to Appointment
        </button>
      </section>
    </div>
  );
}

function SchedulePage(props) {
  return (
    <div class="page">
      <TopBar
        title="Schedule Appointment"
        subtitle="Set your appointment details"
      />

      <section class="main-card schedule-card">
        <div class="selected-box">
          <div class="doc-icon">📄</div>
          <div>
            <small>Selected Document</small>
            <h3>{props.selectedDoc().name}</h3>
          </div>
        </div>

        <div class="schedule-grid">
          <div class="field-block">
            <label>Enter Date</label>
            <input type="text" value="02/27/2026" />
          </div>

          <div class="field-block">
            <label>Enter Time</label>
            <input type="text" value="09:00 AM" />
          </div>
        </div>

        <div class="schedule-box">
          <div class="doc-icon">🕘</div>
          <div>
            <small>Appointment Schedule</small>
            <h3>February 27, 2026 - 9:00 AM</h3>
          </div>
        </div>

        <button
          class="primary-btn full-btn"
          onClick={() => props.setScreen("Review")}
        >
          Continue to Summary
        </button>
      </section>
    </div>
  );
}

function ReviewPage() {
  return (
    <div class="page">
      <TopBar
        title="Review Request"
        subtitle="Please review your request details before submitting"
      />

      <div class="review-grid">
        <section class="main-card info-card">
          <h3>Document Details</h3>

          <div class="info-row">
            <span>Document Type</span>
            <strong>Transcript of Records</strong>
          </div>

          <div class="info-row">
            <span>Appointment Date</span>
            <strong>Friday, February 27, 2026</strong>
          </div>

          <div class="info-row">
            <span>Appointment Time</span>
            <strong>10:00 AM</strong>
          </div>
        </section>

        <section class="main-card info-card">
          <h3>Payment Details</h3>

          <div class="info-row">
            <span>Processing Fee</span>
            <strong>₱150</strong>
          </div>

          <div class="info-row">
            <span>Total Amount</span>
            <strong>₱150</strong>
          </div>

          <div class="info-row">
            <span>Payment Method</span>
            <strong>Pay at Cashier</strong>
          </div>
        </section>
      </div>

      <section class="notes-card">
        <h3>Important Notes</h3>
        <ul>
          <li>Bring a valid ID on your appointment</li>
          <li>Payment will be collected at the cashier</li>
          <li>Processing takes 3 to 5 business days</li>
          <li>You'll receive updates via email</li>
        </ul>
      </section>

      <div class="action-row">
        <button class="primary-btn">Submit Request</button>
        <button class="secondary-btn">Back to Edit Details</button>
      </div>
    </div>
  );
}

function TrackerPage() {
  const steps = [
    {
      title: "Order Placed",
      desc: "Your request has been submitted",
      active: true,
    },
    {
      title: "Processing",
      desc: "Document is being prepared by the Registrar",
      active: true,
    },
    {
      title: "Quality Check",
      desc: "Document is being reviewed",
      active: false,
    },
    {
      title: "Out for Delivery",
      desc: "On its way to your address",
      active: false,
    },
    {
      title: "Delivered",
      desc: "Document has been received",
      active: false,
    },
  ];

  return (
    <div class="page">
      <TopBar title="Order Tracker" subtitle="Track your document request" />

      <section class="main-card tracker-head">
        <div>
          <small>Order #</small>
          <h2>ALM-2026-0001</h2>
          <p>Transcript (TOR)</p>
        </div>

        <div class="tracker-meta">
          <span class="status-pill processing">Processing</span>
          <small>Est. delivery: March 1, 2026</small>
        </div>
      </section>

      <section class="main-card timeline-card">
        <For each={steps}>
          {(step, index) => (
            <div class="timeline-item">
              <div class="timeline-left">
                <div class={`timeline-icon ${step.active ? "active" : ""}`}>
                  {index() + 1}
                </div>
                <Show when={index() !== steps.length - 1}>
                  <div class="timeline-line" />
                </Show>
              </div>

              <div class="timeline-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          )}
        </For>
      </section>
    </div>
  );
}

function HistoryPage() {
  return (
    <div class="page">
      <TopBar title="History" subtitle="Your previous document requests" />

      <div class="stats-grid">
        <div class="stat-card mini">
          <h3>5</h3>
          <p>Total Orders</p>
        </div>

        <div class="stat-card mini">
          <h3>2</h3>
          <p>Active</p>
        </div>

        <div class="stat-card mini">
          <h3>PHP 2,150</h3>
          <p>Total Spent</p>
        </div>
      </div>

      <div class="search-row">
        <input type="text" placeholder="Search by Order number" />
      </div>

      <div class="filter-row">
        <button class="chip active">All</button>
        <button class="chip">Processing</button>
        <button class="chip">In Transit</button>
        <button class="chip">Delivered</button>
        <button class="chip">Cancelled</button>
      </div>

      <div class="history-list">
        <For each={historyItems}>
          {(item) => (
            <section class="main-card history-card">
              <div class="history-main">
                <div class="doc-icon">📄</div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.code}</p>
                  <span
                    class={`status-pill ${item.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div class="history-meta">
                <p>{item.payment}</p>
                <strong>{item.amount}</strong>
                <small>{item.date}</small>
              </div>
            </section>
          )}
        </For>
      </div>
    </div>
  );
}

function AppLayout(props) {
  return (
    <div class="app-shell">
      <Sidebar screen={props.screen} setScreen={props.setScreen} />
      <main class="content">{props.children}</main>
    </div>
  );
}

function App() {
  const [screen, setScreen] = createSignal("Dashboard");
  const [selectedDoc, setSelectedDoc] = createSignal(documents[0]);

  const renderScreen = () => {
    switch (screen()) {
      case "Login":
        return <LoginPage setScreen={setScreen} />;
      case "Dashboard":
        return <DashboardPage setScreen={setScreen} />;
      case "Profile":
        return <ProfilePage />;
      case "Select Document":
        return (
          <SelectDocumentPage
            selectedDoc={selectedDoc}
            setSelectedDoc={setSelectedDoc}
            setScreen={setScreen}
          />
        );
      case "Schedule":
        return <SchedulePage selectedDoc={selectedDoc} setScreen={setScreen} />;
      case "Review":
        return <ReviewPage />;
      case "Tracker":
        return <TrackerPage />;
      case "History":
        return <HistoryPage />;
      default:
        return <DashboardPage setScreen={setScreen} />;
    }
  };

  return (
    <Show
      when={screen() === "Login"}
      fallback={
        <AppLayout screen={screen} setScreen={setScreen}>
          {renderScreen()}
        </AppLayout>
      }
    >
      <LoginPage setScreen={setScreen} />
    </Show>
  );
}

export default App;
