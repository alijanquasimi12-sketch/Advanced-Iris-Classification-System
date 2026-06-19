document.addEventListener('DOMContentLoaded', () => {
    // --- Splash Screen Logic ---
    const loadingTexts = [
        "Initializing Classification Engine...",
        "Loading Iris Dataset...",
        "Preparing Machine Learning Models...",
        "Calibrating Pattern Recognition...",
        "Building Statistical Environment...",
        "Connecting K. M. A² Intelligence Framework...",
        "Synchronizing Analytics Modules...",
        "Loading Prediction Engine...",
        "Activating Data Classification Core...",
        "Connecting K. M. A² Technologies...",
        "Initializing K. M. A² Innovation Labs Modules...",
        "Preparing K. M. A² Nexus Analytics...",
        "Optimizing Model Parameters...",
        "Finalizing User Interface...",
        "Launching Classification Workspace...",
        "System Ready."
    ];
    let textIndex = 0;
    const loadingTextEl = document.getElementById('splash-loading-text');
    const splash1 = document.getElementById('splash-title-1');
    const splash2 = document.getElementById('splash-title-2');
    const splash3 = document.getElementById('splash-title-3');
    
    // Sequential text reveal
    setTimeout(() => { if(splash1) splash1.style.opacity = 1; }, 500);
    setTimeout(() => { if(splash2) splash2.style.opacity = 1; }, 1200);
    setTimeout(() => { if(splash3) splash3.style.opacity = 1; }, 1900);
    setTimeout(() => { if(loadingTextEl) loadingTextEl.style.opacity = 1; }, 2600);
    
    if(loadingTextEl) {
        setTimeout(() => {
            const textInterval = setInterval(() => {
                if(textIndex < loadingTexts.length - 1) {
                    loadingTextEl.style.opacity = 0;
                    setTimeout(() => {
                        textIndex++;
                        loadingTextEl.textContent = loadingTexts[textIndex];
                        loadingTextEl.style.opacity = 1;
                        
                        const progressPercent = (textIndex / (loadingTexts.length - 1)) * 100;
                        const bar = document.querySelector('.loading-bar');
                        if (bar) {
                            bar.style.width = progressPercent + '%';
                        }
                    }, 150);
                }
            }, 350); 
            
            setTimeout(() => clearInterval(textInterval), 6000);
        }, 2600);
    }

    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const mainApp = document.getElementById('main-app');
        
        splash.classList.add('fade-out');
        setTimeout(() => {
            splash.style.display = 'none';
            mainApp.classList.remove('hidden');
            fetchDatasetInfo();
            fetchHistory(); // Load history on startup
        }, 1000); 
    }, 8500); 

    
    // --- Activity Log & Feature Analysis ---
    let activityLog = [];
    let animationsEnabled = true;
    let trainingSessionsCount = 0;
    let bestAccuracy = 0;

    function logActivity(message) {
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        activityLog.unshift(`[${time}] ${message}`);
        if(activityLog.length > 50) activityLog.pop();
        
        const list = document.getElementById('activity-log-list');
        if(list) {
            list.innerHTML = activityLog.map(msg => `<li style="padding: 10px; border-bottom: 1px solid var(--border-color); font-size: 0.9rem; color: var(--text-muted);"><i class="fas fa-angle-right" style="color: var(--accent); margin-right: 8px;"></i> ${msg}</li>`).join('');
        }
    }

    function updateFeatureAnalysis(data) {
        if(!data) return;
        const panel = document.getElementById('feature-analysis-panel');
        if(panel) {
            panel.classList.remove('hidden');
            document.getElementById('feat-most-name').textContent = data.most_important.name;
            document.getElementById('feat-most-val').textContent = (data.most_important.importance * 100).toFixed(1) + '%';
            document.getElementById('feat-least-name').textContent = data.least_important.name;
            document.getElementById('feat-least-val').textContent = (data.least_important.importance * 100).toFixed(1) + '%';
        }
    }

    // --- Settings Modal & Theme Logic ---
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-modal');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.remove('hidden');
            settingsModal.style.display = 'flex';
        });
    }
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('hidden');
            setTimeout(() => settingsModal.style.display = 'none', 300);
        });
    }
    
    const themeToggle = document.getElementById('theme-toggle');
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('kma2_theme') || 'dark';
    if(savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if(themeToggle) themeToggle.checked = false;
    } else {
        if(themeToggle) themeToggle.checked = true;
    }
    
    if(themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            if(!e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('kma2_theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('kma2_theme', 'dark');
            }
        });
    }

    // Removed Activity Log and Animations logic per instructions
    
    // --- New Modal Logic ---
    const aboutDevBtn = document.getElementById('about-dev-btn');
    const aboutDevModal = document.getElementById('about-dev-modal');
    const closeDevModalBtn = document.getElementById('close-dev-modal');
    
    const aboutProjectBtn = document.getElementById('about-project-btn');
    const aboutProjectModal = document.getElementById('about-project-modal');
    const closeProjectModalBtn = document.getElementById('close-project-modal');
    
    const signatureSeriesBtn = document.getElementById('signature-series-btn');
    const signatureModal = document.getElementById('signature-modal');
    const closeSignatureModalBtn = document.getElementById('close-signature-modal');
    
    const headerLogo = document.getElementById('header-logo');
    const splashLogo = document.getElementById('splash-logo-container');
    const logoModal = document.getElementById('logo-modal');
    const closeLogoModalBtn = document.getElementById('close-logo-modal');

    function openModal(modal) {
        if(modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            if(settingsModal && !settingsModal.classList.contains('hidden') && modal !== settingsModal) {
                settingsModal.classList.add('hidden');
                settingsModal.style.display = 'none';
            }
        }
    }
    function hideModal(modal) {
        if(modal) {
            modal.classList.add('hidden');
            setTimeout(() => {
                modal.style.display = 'none';
                
                // Only restore scroll if no other modals are open
                const openModals = document.querySelectorAll('.modal:not(.hidden)');
                if (openModals.length === 0) {
                    document.body.style.overflow = '';
                }
            }, 300);
        }
    }

    const devTransitionScreen = document.getElementById('dev-transition-screen');

    if(aboutDevBtn) aboutDevBtn.addEventListener('click', () => {
        if(settingsModal) {
            settingsModal.classList.add('hidden');
            settingsModal.style.display = 'none';
        }
        if(devTransitionScreen) {
            devTransitionScreen.classList.remove('hidden');
            devTransitionScreen.style.display = 'flex';
            setTimeout(() => {
                devTransitionScreen.classList.add('hidden');
                devTransitionScreen.style.display = 'none';
                openModal(aboutDevModal);
            }, 2500);
        } else {
            openModal(aboutDevModal);
        }
    });
    if(closeDevModalBtn) closeDevModalBtn.addEventListener('click', () => hideModal(aboutDevModal));
    
    if(aboutProjectBtn) aboutProjectBtn.addEventListener('click', () => openModal(aboutProjectModal));
    if(closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', () => hideModal(aboutProjectModal));

    if(signatureSeriesBtn) signatureSeriesBtn.addEventListener('click', () => openModal(signatureModal));
    if(closeSignatureModalBtn) closeSignatureModalBtn.addEventListener('click', () => hideModal(signatureModal));
    
    if(headerLogo) headerLogo.addEventListener('click', () => openModal(logoModal));
    if(splashLogo) splashLogo.addEventListener('click', () => openModal(logoModal));
    if(closeLogoModalBtn) closeLogoModalBtn.addEventListener('click', () => hideModal(logoModal));

    const sampleFlowerBtn = document.getElementById('sample-flower-btn');
    const sampleFlowerModal = document.getElementById('sample-flower-modal');
    const closeSampleFlowerModalBtn = document.getElementById('close-sample-flower-modal');

    if(sampleFlowerBtn) sampleFlowerBtn.addEventListener('click', () => openModal(sampleFlowerModal));
    if(closeSampleFlowerModalBtn) closeSampleFlowerModalBtn.addEventListener('click', () => hideModal(sampleFlowerModal));


    // --- DOM Elements ---
    const trainBtn = document.getElementById('train-btn');
    const predictBtn = document.getElementById('predict-btn');
    const compareBtn = document.getElementById('compare-btn');
    const visualsSection = document.getElementById('visuals-section');
    const datasetModal = document.getElementById('dataset-modal');
    const sessionModal = document.getElementById('session-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const closeSessionModalBtn = document.getElementById('close-session-modal');
    const predictStatus = document.getElementById('predict-status');

    // History Session State
    let predictionSessionHistory = [];
    
    // Check if models exist and load data info
    async function initializeSession() {
        try {
            await fetch('/api/reset');
            predictionSessionHistory = [];
            document.getElementById('session-count').textContent = '0';
            
            document.getElementById('visuals-placeholder').classList.remove('hidden');
            visualsSection.classList.add('hidden');
            document.getElementById('history-section').classList.add('hidden');
            document.getElementById('prediction-result').classList.add('hidden');
            document.getElementById('row-3-charts')?.classList.add('hidden');
            document.getElementById('dataset-visuals')?.classList.remove('hidden');
            
            checkModelStatus();
        } catch (e) {
            console.error(e);
        }
    }
    
    initializeSession();

    // --- Toast Notification System ---
    function showToast(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = 'fa-info-circle';
        if(type === 'success') icon = 'fa-check-circle';
        if(type === 'error') icon = 'fa-exclamation-triangle';
        
        toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            if (container.contains(toast)) {
                toast.style.animation = 'toastFadeOut 0.4s ease forwards';
                setTimeout(() => {
                    if (container.contains(toast)) {
                        container.removeChild(toast);
                    }
                }, 400);
            }
        }, duration - 400);
    }
    window.showToast = showToast;

    // --- Initialization & Status Check ---
    async function checkModelStatus() {
        try {
            const res = await fetch('/api/info');
            if(res.ok) {
                const data = await res.json();
                
                document.getElementById('stat-samples').textContent = data.samples;
                document.getElementById('stat-classes').textContent = data.classes;
                document.getElementById('stat-features').textContent = data.features;
            logActivity('Dataset Loaded');
            if(data.feature_importance_data) updateFeatureAnalysis(data.feature_importance_data);
                
                if (data.class_distribution_plot) {
                    const classPlot = document.getElementById('class-plot');
                    classPlot.src = 'data:image/png;base64,' + data.class_distribution_plot;
                    classPlot.style.display = 'block';
                }
                
                if(data.is_trained) {
                    fetchHistory();
                }
            }
        } catch(e) {
            console.error('Failed to connect to backend.');
        }
    }

    // --- API Calls & UI Updates ---
    
    async function fetchDatasetInfo() {
        try {
            const response = await fetch('/api/info');
            const data = await response.json();
            
            document.getElementById('stat-samples').textContent = data.samples;
            document.getElementById('stat-classes').textContent = data.classes;
            document.getElementById('stat-features').textContent = data.features;
            logActivity('Dataset Loaded');
            if(data.feature_importance_data) updateFeatureAnalysis(data.feature_importance_data);
            
            if (data.plots) {
                if(data.plots.correlation_heatmap) {
                    document.getElementById('corr-plot').src = 'data:image/png;base64,' + data.plots.correlation_heatmap;
                    document.getElementById('corr-plot').style.display = 'block';
                }
                if(data.plots.feature_importance) {
                    document.getElementById('feat-imp-plot').src = 'data:image/png;base64,' + data.plots.feature_importance;
                    document.getElementById('feat-imp-plot').style.display = 'block';
                }
                if(data.plots.confusion_matrix) {
                    document.getElementById('cm-plot').src = 'data:image/png;base64,' + data.plots.confusion_matrix;
                    document.getElementById('cm-plot').style.display = 'block';
                }
                if(data.plots.feature_distribution) {
                    document.getElementById('feature-plot').src = 'data:image/png;base64,' + data.plots.feature_distribution;
                    document.getElementById('feature-plot').style.display = 'block';
                }
                if(data.plots.class_distribution) {
                    document.getElementById('class-plot').src = 'data:image/png;base64,' + data.plots.class_distribution;
                    document.getElementById('class-plot').style.display = 'block';
                }
                
                if (data.is_trained) {
                    document.getElementById('visuals-section').classList.remove('hidden');
                }
            }
        } catch (error) {
            console.error('Error fetching dataset info:', error);
        }
    }

    // Modal Logic
    document.getElementById('view-dataset-btn').addEventListener('click', () => {
        datasetModal.classList.remove('hidden');
        datasetModal.style.display = 'flex';
        fetchDatasetExplorerData();
        logActivity('Dataset Viewed');
    });

    closeModalBtn.addEventListener('click', () => {
        datasetModal.classList.add('hidden');
        setTimeout(() => datasetModal.style.display = 'none', 300);
    });
    
    // Modal click outside to close
    window.addEventListener('click', (e) => {
        if(e.target === datasetModal) {
            datasetModal.classList.add('hidden');
            setTimeout(() => datasetModal.style.display = 'none', 300);
        }
        if(e.target === settingsModal) hideModal(settingsModal);
        if(e.target === sessionModal) hideModal(sessionModal);
        if(e.target === aboutDevModal) hideModal(aboutDevModal);
        if(e.target === aboutProjectModal) hideModal(aboutProjectModal);
        if(e.target === signatureModal) hideModal(signatureModal);
        if(e.target === document.getElementById('logo-modal-overlay')) hideModal(logoModal);
        if(e.target === document.getElementById('sample-flower-modal')) hideModal(document.getElementById('sample-flower-modal'));
    });

    // Handle Session History Modal
    document.getElementById('session-history-btn').addEventListener('click', () => {
        populateSessionHistoryTable();
        sessionModal.classList.remove('hidden');
        sessionModal.style.display = 'flex';
    });

    closeSessionModalBtn.addEventListener('click', () => {
        sessionModal.classList.add('hidden');
        setTimeout(() => sessionModal.style.display = 'none', 300);
    });
    
    document.getElementById('clear-history-btn').addEventListener('click', () => {
        predictionSessionHistory = [];
        document.getElementById('session-count').textContent = '0';
        populateSessionHistoryTable();
        showToast("Prediction history cleared.", "success");
    });
    
    document.getElementById('export-history-btn').addEventListener('click', () => {
        if(predictionSessionHistory.length === 0) {
            if (typeof window.showToast === 'function') {
                window.showToast("No prediction history available to export.", "error");
            } else {
                showToast("No prediction history available to export.", "error");
            }
            return;
        }
        
        const now = new Date().toLocaleString();
        let htmlContent = `
        <html>
        <head>
            <title>Prediction History Report</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
                .header { text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
                .header h1 { margin: 0; color: #1a202c; font-size: 26px; }
                .header p { margin: 8px 0 0; color: #718096; font-size: 14px; }
                .branding { font-style: italic; color: #ff1493; font-weight: bold; margin-top: 12px; font-size: 16px; letter-spacing: 1px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #cbd5e0; padding: 12px; text-align: left; font-size: 13px; }
                th { background-color: #f7fafc; color: #4a5568; font-weight: 600; }
                tr:nth-child(even) { background-color: #f8fafc; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Advanced Iris Classification System</h1>
                <div class="branding">K. M. A² Signature Series</div>
                <p>Generated on: ${now}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Session ID</th>
                        <th>Timestamp</th>
                        <th>Flower Name</th>
                        <th>Confidence %</th>
                        <th>Sepal Length</th>
                        <th>Sepal Width</th>
                        <th>Petal Length</th>
                        <th>Petal Width</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        predictionSessionHistory.forEach(r => {
            htmlContent += `
                <tr>
                    <td>${r.sessionNumber || 1}</td>
                    <td>${r.timestamp}</td>
                    <td><strong>Iris ${r.prediction}</strong></td>
                    <td>${(parseFloat(r.confidence)*100).toFixed(1)}%</td>
                    <td>${r.sl}</td>
                    <td>${r.sw}</td>
                    <td>${r.pl}</td>
                    <td>${r.pw}</td>
                </tr>
            `;
        });
        
        htmlContent += `
                </tbody>
            </table>
            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        if (typeof window.showToast === 'function') {
            window.showToast("Report downloaded successfully.", "success", 3000);
        } else {
            showToast("Report downloaded successfully.", "success");
        }
        logActivity('Prediction History Exported to PDF');
    });
    
    function populateSessionHistoryTable() {
        const tbody = document.querySelector('#session-history-table tbody');
        tbody.innerHTML = '';
        if(predictionSessionHistory.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No predictions made in this session yet.</td></tr>';
            return;
        }
        predictionSessionHistory.forEach((r, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${r.sessionNumber || 1}</td>
                <td>${r.timestamp}</td>
                <td><strong>Iris ${r.prediction}</strong></td>
                <td>${(parseFloat(r.confidence)*100).toFixed(1)}%</td>
                <td>${r.sl}</td>
                <td>${r.sw}</td>
                <td>${r.pl}</td>
                <td>${r.pw}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    async function fetchDatasetExplorerData() {
        showToast('Loading dataset explorer...', 'info');
        try {
            const response = await fetch('/api/dataset');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            // Populate Stats
            const statsBody = document.querySelector('#modal-stats-table tbody');
            statsBody.innerHTML = '';
            data.stats.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${row.Feature || ''}</strong></td>
                    <td>${row.count || 0}</td>
                    <td>${row.mean || 0}</td>
                    <td>${row.std || 0}</td>
                    <td>${row.min || 0}</td>
                    <td>${row['25%'] || 0}</td>
                    <td>${row['50%'] || 0}</td>
                    <td>${row['75%'] || 0}</td>
                    <td>${row.max || 0}</td>
                `;
                statsBody.appendChild(tr);
            });

            // Populate Head
            const headBody = document.querySelector('#modal-head-table tbody');
            headBody.innerHTML = '';
            data.head.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row['Flower ID'] !== null ? row['Flower ID'] : ''}</td>
                    <td><strong>${row['Flower Name'] || ''}</strong></td>
                    <td>${row['Sepal Length'] || ''}</td>
                    <td>${row['Sepal Width'] || ''}</td>
                    <td>${row['Petal Length'] || ''}</td>
                    <td>${row['Petal Width'] || ''}</td>
                `;
                headBody.appendChild(tr);
            });

            // Populate Tail
            const tailBody = document.querySelector('#modal-tail-table tbody');
            tailBody.innerHTML = '';
            data.tail.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row['Flower ID'] !== null ? row['Flower ID'] : ''}</td>
                    <td><strong>${row['Flower Name'] || ''}</strong></td>
                    <td>${row['Sepal Length'] || ''}</td>
                    <td>${row['Sepal Width'] || ''}</td>
                    <td>${row['Petal Length'] || ''}</td>
                    <td>${row['Petal Width'] || ''}</td>
                `;
                tailBody.appendChild(tr);
            });
            
            // Populate Prediction Log
            const predLogBody = document.querySelector('#modal-prediction-log-table tbody');
            predLogBody.innerHTML = '';
            predictionSessionHistory.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.sessionNumber}</td>
                    <td>${row.timestamp}</td>
                    <td><strong>${row.prediction}</strong></td>
                    <td>${row.sl}</td>
                    <td>${row.sw}</td>
                    <td>${row.pl}</td>
                    <td>${row.pw}</td>
                    <td>${(row.confidence * 100).toFixed(1)}%</td>
                `;
                predLogBody.appendChild(tr);
            });
            
            document.getElementById('dataset-modal').classList.add('active');

        } catch(e) {
            showToast('Could not load dataset details. Please check the server connection.', 'error');
        }
    }

    // Train Logic
    trainBtn.addEventListener('click', async () => {
        const kNeighbors = document.getElementById('k-neighbors').value;
        const statusDiv = document.getElementById('train-status');
        
        const originalText = trainBtn.innerHTML;
        trainBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Training...';
        trainBtn.disabled = true;
        statusDiv.className = 'status-message';
        
        if (animationsEnabled) {
            statusDiv.textContent = 'Loading Dataset...';
            await new Promise(r => setTimeout(r, 400));
            statusDiv.textContent = 'Preprocessing Data...';
            await new Promise(r => setTimeout(r, 400));
            statusDiv.textContent = 'Training Model...';
            await new Promise(r => setTimeout(r, 400));
            statusDiv.textContent = 'Calculating Metrics...';
            await new Promise(r => setTimeout(r, 400));
            statusDiv.textContent = 'Generating Visualizations...';
            await new Promise(r => setTimeout(r, 400));
        } else {
            statusDiv.textContent = 'Initializing training sequence...';
        }

        showToast('Model Training Started', 'info');
        
        try {
            const response = await fetch('/api/train', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ n_neighbors: parseInt(kNeighbors) })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                statusDiv.className = 'status-message success';
                statusDiv.textContent = 'Model trained and saved successfully.';

                logActivity('Model Trained');
                document.getElementById('stat-k-value').textContent = kNeighbors;
                if(data.feature_importance_data) updateFeatureAnalysis(data.feature_importance_data);
                statusDiv.textContent = 'Training Completed';
                setTimeout(() => { if(statusDiv.textContent === 'Training Completed') statusDiv.textContent = ''; }, 3000);

                
                // Update metrics
                document.getElementById('stat-accuracy').textContent = (data.metrics.accuracy * 100).toFixed(1) + '%';
                document.getElementById('metric-precision').textContent = data.metrics.precision.toFixed(4);
                document.getElementById('metric-recall').textContent = data.metrics.recall.toFixed(4);
                document.getElementById('metric-f1').textContent = data.metrics.f1_score.toFixed(4);
                
                // Update plots
                if(data.plots.confusion_matrix) {
                    document.getElementById('cm-plot').src = 'data:image/png;base64,' + data.plots.confusion_matrix;
                    document.getElementById('cm-plot').style.display = 'block';
                }
                if(data.plots.feature_distribution) {
                    document.getElementById('feature-plot').src = 'data:image/png;base64,' + data.plots.feature_distribution;
                    document.getElementById('feature-plot').style.display = 'block';
                }
                if(data.plots.class_distribution) {
                    document.getElementById('class-plot').src = 'data:image/png;base64,' + data.plots.class_distribution;
                    document.getElementById('class-plot').style.display = 'block';
                }
                
                // Advanced plots
                if(data.plots.correlation_heatmap) {
                    document.getElementById('corr-plot').src = 'data:image/png;base64,' + data.plots.correlation_heatmap;
                    document.getElementById('corr-plot').style.display = 'block';
                }
                if(data.plots.feature_importance) {
                    document.getElementById('feat-imp-plot').src = 'data:image/png;base64,' + data.plots.feature_importance;
                    document.getElementById('feat-imp-plot').style.display = 'block';
                }
                
                document.getElementById('visuals-placeholder').classList.add('hidden');
                visualsSection.classList.remove('hidden');
                document.getElementById('row-3-charts').classList.remove('hidden');
                
                fetchHistory();
                showToast(data.message, 'success');
            } else {
                statusDiv.className = 'status-message error';
                statusDiv.textContent = 'Training Failed.';
                showToast(data.detail, 'error');
            }
        } catch (error) {
            statusDiv.className = 'status-message error';
            statusDiv.textContent = 'Connection error.';
            showToast('Connection error', 'error');
        } finally {
            trainBtn.innerHTML = originalText;
            trainBtn.disabled = false;
        }
    });

    // Predict Button Logic
    predictBtn.addEventListener('click', async () => {
        const sl = parseFloat(document.getElementById('sl').value);
        const sw = parseFloat(document.getElementById('sw').value);
        const pl = parseFloat(document.getElementById('pl').value);
        const pw = parseFloat(document.getElementById('pw').value);

        if (isNaN(sl) || isNaN(sw) || isNaN(pl) || isNaN(pw)) {
            showToast("Please enter all flower measurements before predicting.", "error");
            return;
        }

        predictStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing flower features...';
        
        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sepal_length: sl, sepal_width: sw, petal_length: pl, petal_width: pw })
            });
            const data = await response.json();
            
            if(data.status === 'success') {
                const result = data.result;
                predictStatus.innerHTML = '';
                
                // Show Result Section
                document.getElementById('prediction-result').classList.remove('hidden');
                
                // Set Title and Color
                const titleEl = document.getElementById('pred-title');
                titleEl.textContent = 'Iris ' + result.prediction;
                
                let themeColor = '#4fd1c5'; // Default
                if(result.prediction === 'Setosa') themeColor = '#f6ad55';
                if(result.prediction === 'Versicolor') themeColor = '#68d391';
                if(result.prediction === 'Virginica') themeColor = '#fc8181';
                
                titleEl.style.color = themeColor;
                
                // Update Image
                const imgEl = document.getElementById('pred-flower-img');
                imgEl.src = `assets/flowers/${result.prediction.toLowerCase()}.png`;
                imgEl.classList.remove('hidden');
                imgEl.style.display = 'block';
                
                // Update Confidence
                const confPercent = (result.confidence * 100).toFixed(1);
                document.getElementById('confidence-bar').style.width = confPercent + '%';
                document.getElementById('confidence-bar').style.backgroundColor = themeColor;
                document.getElementById('pred-confidence-text').textContent = `Confidence: ${confPercent}%`;
                
                // Update Explanation
                const descMap = {
                    "Setosa": "Iris Setosa is known for its relatively short and broad sepals, and very small petals. It typically grows in cooler regions and is easily distinguishable from other Iris species by its miniature petal structure.",
                    "Versicolor": "Iris Versicolor (Blue Flag Iris) features medium-sized sepals and petals. It often thrives in wetlands and exhibits an intermediate measurement profile, making it the transitional species in the Iris dataset.",
                    "Virginica": "Iris Virginica (Virginia Iris) is distinguished by its significantly larger sepals and petals. It tends to grow taller and its distinctive wide petals are a strong identifier compared to Setosa or Versicolor."
                };
                document.getElementById('pred-explanation').textContent = descMap[result.prediction] || data.result.explanation;
                
                // Store in Session History
                predictionSessionHistory.unshift({
                    sessionNumber: predictionSessionHistory.length + 1,
                    timestamp: new Date().toLocaleTimeString(),
                    prediction: data.result.prediction,
                    confidence: data.result.confidence,
                    sl: sl,
                    sw: sw,
                    pl: pl,
                    pw: pw
                });
                
                // Update Counter
                document.getElementById('session-count').textContent = predictionSessionHistory.length;

                logActivity('Prediction Generated');
                document.getElementById('stat-predictions').textContent = predictionSessionHistory.length;
                
                const aiPanel = document.getElementById('ai-explanation-box');
                const aiList = document.getElementById('pred-ai-explanation');
                if(aiPanel && aiList) {
                    aiPanel.classList.remove('hidden');
                    let aiPoints = '';
                    if(result.prediction === 'Setosa') {
                        aiPoints += `<li>Petal Length (${pl}) strongly matches Setosa patterns.</li>`;
                        if(pw < 0.6) aiPoints += `<li>Petal Width (${pw}) contributes significantly.</li>`;
                    } else if (result.prediction === 'Versicolor') {
                        aiPoints += `<li>Petal Length (${pl}) strongly matches Versicolor patterns.</li>`;
                        if(pw >= 1.0 && pw <= 1.8) aiPoints += `<li>Petal Width (${pw}) contributes significantly.</li>`;
                    } else if (result.prediction === 'Virginica') {
                        aiPoints += `<li>Petal Length (${pl}) strongly matches Virginica patterns.</li>`;
                        if(pw > 1.8) aiPoints += `<li>Petal Width (${pw}) contributes significantly.</li>`;
                    }
                    aiPoints += `<li>Measurements closely align with learned dataset patterns.</li>`;
                    aiPoints += `<li>Prediction Confidence: ${(result.confidence * 100).toFixed(1)}%</li>`;
                    aiList.innerHTML = aiPoints;
                }

                
                showToast(`Successfully classified as Iris ${result.prediction}`, "success");
            } else {
                predictStatus.innerHTML = '<span class="error"><i class="fas fa-exclamation-triangle"></i> Error making prediction</span>';
                showToast(data.detail || "Prediction failed.", "error");
            }
        } catch (error) {
            predictStatus.innerHTML = '<span class="error"><i class="fas fa-plug"></i> Connection Error</span>';
            showToast("Server connection failed.", "error");
        }
    });

    // Compare Algorithms Logic
    compareBtn.addEventListener('click', async () => {
        const originalText = compareBtn.innerHTML;
        compareBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running Comparison...';
        compareBtn.disabled = true;
        showToast('Running Model Comparison...', 'info');
        
        try {
            const response = await fetch('/api/compare');
            const data = await response.json();
            
            if(response.ok) {
                document.getElementById('comparison-section').classList.remove('hidden');
                
                const tbody = document.getElementById('comparison-tbody');
                const list = document.getElementById('leaderboard-list');
                tbody.innerHTML = '';
                list.innerHTML = '';
                
                // Populate Table & Leaderboard (data is already sorted by accuracy descending)
                data.leaderboard.forEach((model, index) => {
                    // Table row
                    const tr = document.createElement('tr');
                    if (index === 0) tr.className = 'best-algo-row';
                    tr.innerHTML = `
                        <td>${model.algorithm} ${index === 0 ? '<i class="fas fa-star" title="Best"></i>' : ''}</td>
                        <td>${(model.accuracy * 100).toFixed(2)}%</td>
                        <td>${model.precision.toFixed(4)}</td>
                        <td>${model.recall.toFixed(4)}</td>
                        <td>${model.f1_score.toFixed(4)}</td>
                    `;
                    tbody.appendChild(tr);
                    
                    // Leaderboard item
                    if (index < 3) {
                        const li = document.createElement('li');
                        li.className = `rank-${index + 1}`;
                        
                        let medal = '🥉';
                        if(index === 0) medal = '🥇';
                        if(index === 1) medal = '🥈';
                        
                        li.innerHTML = `
                            <div class="rank-badge">${medal}</div>
                            <div class="leader-info">
                                <h4>${model.algorithm}</h4>
                                <p>Accuracy: ${(model.accuracy * 100).toFixed(2)}%</p>
                            </div>
                        `;
                        list.appendChild(li);
                    }
                });
                showToast('Comparison Completed', 'success');
            }
        } catch(e) {
            showToast('Comparison failed', 'error');
        } finally {
            compareBtn.innerHTML = originalText;
            compareBtn.disabled = false;
        }
    });

    // History Logic
    async function fetchHistory() {
        try {
            const response = await fetch('/api/history');
            const data = await response.json();
            
            if (data && data.length > 0) {
                document.getElementById('history-section').classList.remove('hidden');
                
                trainingSessionsCount = data.length;
                document.getElementById('stat-sessions').textContent = trainingSessionsCount;
                data.forEach(d => {
                   const acc = d.metrics ? d.metrics.accuracy : (d.accuracy || 0);
                   if(acc > bestAccuracy) bestAccuracy = acc;
                });
                document.getElementById('stat-best-acc').textContent = (bestAccuracy * 100).toFixed(2) + '%';

                const tbody = document.getElementById('history-tbody');
                tbody.innerHTML = '';
                
                data.forEach((session, index) => {
                    const timestamp = session.timestamp || session.date || 'Unknown';
                    const metrics = session.metrics || {
                        accuracy: session.accuracy || 0,
                        precision: session.precision || 0,
                        recall: session.recall || 0,
                        f1_score: session.f1_score || 0
                    };
                    
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>Session ${session.session || index + 1}</td>
                        <td>${timestamp}</td>
                        <td>${session.k_value || '5'}</td>
                        <td>${(metrics.accuracy * 100).toFixed(2)}%</td>
                        <td>${metrics.precision.toFixed(4)}</td>
                        <td>${metrics.recall.toFixed(4)}</td>
                        <td>${metrics.f1_score.toFixed(4)}</td>
                        <td>${session.dominant_predicted || 'N/A'}</td>
                        <td style="font-weight:bold; color:#4fd1c5;">${session.total_predictions || 0}</td>
                        <td><span class="badge" style="background-color: var(--primary); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">${session.model_status || 'Active'}</span></td>
                        <td>${session.training_duration || 'N/A'}</td>
                        <td style="font-style: italic; opacity: 0.8;">${session.notes || 'Standard sequence'}</td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        } catch(e) {
            console.error('Failed to load history');
        }
    }
});

// Global toggle function for flower cards
window.toggleFlowerCard = function(element) {
    const details = element.querySelector('.flower-card-details');
    if (details) {
        if (details.classList.contains('hidden')) {
            details.classList.remove('hidden');
            element.style.borderColor = 'rgba(255, 105, 180, 0.5)';
            element.style.boxShadow = '0 10px 25px rgba(255, 105, 180, 0.2)';
        } else {
            details.classList.add('hidden');
            element.style.borderColor = 'var(--border)';
            element.style.boxShadow = 'none';
        }
    }
};
