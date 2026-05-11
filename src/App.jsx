import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'

// --- NEXUS OS CORE THEME ---
const theme = {bg: '#050507', card: '#0d0d10', text: '#ffffff', subText: '#9494a3', border: 'rgba(255, 255, 255, 0.08)', accent: '#3b82f6', accentGlow: 'rgba(59, 130, 246, 0.25)', danger: '#ef4444', inputBg: 'rgba(0, 0, 0, 0.3)', cardBgLight: '#111116', success: '#10b981'}

// --- LANGUAGE SYSTEM ---
const translations = {
  en: {
    // Navbar / Header
    nexusMarket: 'NEXUS MARKET',
    login: 'LOGIN',
    adminPortal: 'ADMIN PORTAL',
    myTerminal: 'MY TERMINAL',
    exit: 'EXIT',
    // Hero
    heroBadge: 'NEXUS MARKET // ONLINE',
    heroTitle1: 'NEXT-GEN',
    heroTitle2: 'HARDWARE',
    quantumEncrypted: 'QUANTUM ENCRYPTED',
    heroSub1: 'Military-grade encrypted hardware procurement platform.',
    heroSub2: 'Neural-link compatible devices for the modern operator.',
    exploreInventory: 'EXPLORE INVENTORY →',
    accessTerminal: 'ACCESS TERMINAL',
    encryption: 'ENCRYPTION',
    uptime: 'UPTIME',
    hardware: 'HARDWARE',
    support: 'SUPPORT',
    // Search / Filter
    searchPlaceholder: 'Search products by name or brand...',
    allProducts: 'All Products',
    noProductsFound: 'NO PRODUCTS FOUND',
    tryDifferentKeywords: 'Try searching with different keywords',
    // Product cards
    analysis: 'ANALYSIS',
    add: 'ADD',
    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Cart is empty',
    total: 'TOTAL:',
    checkout: 'CHECKOUT',
    // Product Modal
    productAnalysis: 'PRODUCT ANALYSIS',
    removeFromFav: '❤️ REMOVE FROM FAV',
    addToFav: '🔖 ADD TO FAV',
    addToCart: '🛒 ADD TO CART',
    close: 'CLOSE',
    detailedSpecs: 'DETAILED SPECIFICATIONS',
    price: 'PRICE',
    brand: 'BRAND',
    productId: 'PRODUCT ID',
    // Auth page
    systemOnline: 'SYSTEM ONLINE',
    operatorAccess: 'OPERATOR ACCESS',
    accessId: 'ACCESS ID',
    securityKey: 'SECURITY KEY',
    initSession: 'INITIATE SESSION',
    registerAccess: 'REGISTER ACCESS',
    noAccount: "DON'T HAVE AN ACCOUNT?",
    haveAccount: 'ALREADY HAVE AN ACCOUNT?',
    codename: 'CODENAME',
    // User Dashboard sidebar
    coreStatus: 'Core Status',
    orders: 'Orders',
    addresses: 'Addresses',
    favorites: 'Favorites',
    security: 'Security',
    accountActivity: 'Account Activity',
    feedback: 'Feedback',
    authorized: 'AUTHORIZED',
    operatorMesh: 'OPERATOR // NEXUS MESH',
    // Checkout
    checkoutStep1: 'CHECKOUT STEP 1/3',
    checkoutStep2: 'CHECKOUT STEP 2/3',
    selectDelivery: 'SELECT DELIVERY ADDRESS',
    paymentDetails: 'PAYMENT DETAILS',
    deliveryAddress: 'DELIVERY ADDRESS',
    continueToPayment: 'CONTINUE TO PAYMENT →',
    cancel: 'CANCEL',
    cardholderName: 'CARDHOLDER NAME',
    cardNumber: 'CARD NUMBER',
    expiryDate: 'EXPIRY DATE (MM/YY)',
    cvv: 'CVV',
    confirmPayment: '💳 CONFIRM PAYMENT',
    processing: '⏳ PROCESSING...',
    orderConfirmed: 'ORDER CONFIRMED!',
    orderPlaced: 'Your order has been successfully placed.',
    orderNumber: 'ORDER NUMBER',
    totalAmount: 'TOTAL AMOUNT',
    itemsCount: 'ITEMS COUNT',
    viewOrders: '→ VIEW ORDERS',
    // Home tab
    systemStatus: 'SYSTEM STATUS',
    welcomeBack: 'Welcome back',
    accessMarket: 'ACCESS MARKET',
    liveMetrics: 'LIVE METRICS',
    networkLatency: 'Network Latency',
    activeNodes: 'Active Nodes',
    uplinkStatus: 'Uplink Status',
    jsHeapUsed: 'JS Heap Used',
    online: 'ONLINE',
    offline: 'OFFLINE',
    systemHealthMatrix: 'SYSTEM HEALTH MATRIX',
    cpuEstimate: 'CPU ESTIMATE',
    jsMemory: 'JS MEMORY',
    network: 'NETWORK',
    storage: 'STORAGE',
    // Orders tab
    ordersModule: 'ORDERS MODULE',
    myOrders: 'My Orders',
    noOrdersFound: 'NO ORDERS FOUND',
    orderId: 'Order ID',
    date: 'Date',
    status: 'Status',
    removeFromView: '🗑 REMOVE FROM VIEW',
    remove: 'REMOVE',
    orderItems: 'ORDER ITEMS',
    // Address tab
    addressesModule: 'ADDRESSES MODULE',
    myAddresses: 'My Addresses',
    noAddressFound: 'NO ADDRESS FOUND',
    newAddress: '+ NEW ADDRESS',
    addFirstAddress: 'ADD FIRST ADDRESS',
    addNewAddress: 'ADD NEW ADDRESS',
    updateAddress: 'UPDATE ADDRESS',
    addressTitle: 'ADDRESS TITLE',
    fullName: 'FULL NAME',
    phone: 'PHONE',
    city: 'CITY',
    district: 'DISTRICT',
    addressDetails: 'ADDRESS DETAILS',
    saveChanges: '✓ SAVE CHANGES',
    addAddress: '+ ADD ADDRESS',
    edit: 'EDIT',
    delete: 'DELETE',
    // Feedback
    submitFeedback: 'SUBMIT FEEDBACK',
    // Misc
    deleteProduct: 'Delete Product',
    deleteUser: 'Delete User',
    permanentlyDeleted: 'This product will be permanently deleted.',
    cannotBeUndone: 'This action cannot be undone.',
    deleteBtn: 'DELETE',
    noProductsYet: 'NO PRODUCTS YET',
    noApplicationsYet: 'NO APPLICATIONS YET',
    accessId_placeholder: 'operator@nexus.io',
    codename_placeholder: 'Enter codename',
    securityKey_placeholder: '••••••••',
    // Security Tab
    securityModule: 'SECURITY MODULE',
    securityTitle: 'Security & Account',
    securitySubtitle: 'Manage your identity, credentials and account security.',
    activeSession: 'ACTIVE SESSION',
    uploadPhoto: 'UPLOAD PHOTO',
    uploadPhotoHint: 'JPG, PNG or WebP · max 2MB',
    changePassword: 'Change Password',
    changePasswordSub: 'Update your login credentials',
    currentPassword: 'CURRENT PASSWORD',
    newPassword: 'NEW PASSWORD',
    confirmPassword: 'CONFIRM PASSWORD',
    updatePassword: '🔑 UPDATE PASSWORD',
    updatingPassword: 'UPDATING...',
    changeEmail: 'Change Email',
    currentLabel: 'Current:',
    newEmailAddress: 'NEW EMAIL ADDRESS',
    updateEmail: '📧 UPDATE EMAIL',
    updatingEmail: 'UPDATING...',
    userIdLabel: 'USER ID',
    lastLoginLabel: 'LAST LOGIN',
    accountRoleLabel: 'ACCOUNT ROLE',
    // Feedback Tab
    sendFeedbackTitle: 'Send Feedback',
    sendFeedbackSub: 'Your feedback is forwarded directly to the admin panel.',
    feedbackReceived: 'FEEDBACK RECEIVED',
    feedbackRecordedMsg: 'Your feedback has been recorded and sent to the admin panel.',
    categoryLabel: 'CATEGORY',
    experienceRating: 'EXPERIENCE RATING',
    subjectLabel: 'SUBJECT',
    messageLabel: 'MESSAGE',
    subjectPlaceholder: 'Enter subject title...',
    messagePlaceholder: 'Describe your feedback in detail...',
    transmitting: '⏳ TRANSMITTING...',
    // Rating labels
    ratingTerrible: 'Terrible',
    ratingBad: 'Bad',
    ratingAverage: 'Average',
    ratingGood: 'Good',
    ratingExcellent: 'Excellent',
    // Feedback categories
    catGeneral: 'General',
    catBugReport: 'Bug Report',
    catSuggestion: 'Suggestion',
    catSupport: 'Support',
    // Favorites
    removeFromFavorites: '🗑 REMOVE FROM FAVORITES',
    // Activity Tab
    activityModule: 'ACTIVITY MODULE',
    accountActivityTitle: 'Account Activity',
    loginLogoutHistory: 'LOGIN / LOGOUT HISTORY',
    noSessionHistory: 'No session history yet',
    sessionOpened: 'Session Opened',
    sessionClosed: 'Session Closed',
    // Password/email toast messages
    fillAllFields: 'Please fill in all fields',
    passwordsNoMatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordChanged: 'Password changed successfully',
    validEmail: 'Please enter a valid email address',
    emailUpdateSent: 'Email update request sent',
    connectionError: 'Connection error',
    profilePhotoUpdated: 'Profile photo updated',
    subjectRequired: 'Subject and message fields are required.',
    selectRating: 'Please select a rating.',
    feedbackTransmitted: 'Feedback transmitted successfully.',
    // Admin Dashboard
    adminControlPanel: 'ADMIN CONTROL PANEL',
    rootAccess: 'ROOT ACCESS',
    adProducts: 'Products',
    adUsers: 'Users',
    adErrorLog: 'Error Log',
    adAuditLog: 'Audit Log',
    adProductLog: 'Product Log',
    adFeedbackLog: 'Feedback Log',
    adRoleChangeLog: 'Role Change Log',
    adReturnHome: '\ud83c\udfea RETURN HOME',
    adKillConnection: '\ud83d\udd0c KILL CONNECTION',
    adProductRegistry: 'PRODUCT REGISTRY',
    adUserRegistry: 'USER REGISTRY',
    adRecords: 'records',
    adSearchProducts: 'Search products...',
    adSearchUsers: 'Search users...',
    adNewProduct: '+ NEW PRODUCT',
    adClearAll: 'CLEAR ALL',
    adName: 'NAME',
    adEmail: 'EMAIL',
    adRole: 'ROLE',
    adActions: 'ACTIONS',
    adNoProducts: 'No products found',
    adNoUsers: 'No users found',
    adEdit: 'EDIT',
    adMakeUser: 'MAKE USER',
    adMakeAdmin: 'MAKE ADMIN',
    adDelete: 'DELETE',
    adProtected: 'PROTECTED',
    adTimestamp: 'TIMESTAMP',
    adType: 'TYPE',
    adMessage: 'MESSAGE',
    adUser: 'USER',
    adAction: 'ACTION',
    adSource: 'SOURCE',
    adSubject: 'SUBJECT',
    adRating: 'RATING',
    adCategory: 'CATEGORY',
    adChangedBy: 'CHANGED BY',
    adTargetUser: 'TARGET USER',
    adOldRole: 'OLD ROLE',
    adNewRole: 'NEW ROLE',
    adNoErrors: 'No errors recorded',
    adNoAudit: 'No audit events recorded',
    adNoProductLog: 'No product events recorded',
    adNoFeedback: 'No feedback received yet',
    adNoRoleChange: 'No role changes recorded',
    adAdminConsole: 'Admin Console',
    adRootActive: 'Root Access Active',
    adProductName: 'PRODUCT NAME *',
    adProductBrand: 'PRODUCT BRAND',
    adProductPrice: 'PRODUCT PRICE (TL) *',
    adSaveChanges: 'SAVE CHANGES',
    adDeployProduct: 'DEPLOY PRODUCT',
    adProductImage: 'PRODUCT IMAGE',
  },
  fr: {
    nexusMarket: 'NEXUS MARKET',
    login: 'CONNEXION',
    adminPortal: 'PORTAIL ADMIN',
    myTerminal: 'MON TERMINAL',
    exit: 'QUITTER',
    heroBadge: 'NEXUS MARKET // EN LIGNE',
    heroTitle1: 'MATÉRIEL',
    heroTitle2: 'NOUVELLE GÉN.',
    quantumEncrypted: 'CHIFFREMENT QUANTIQUE',
    heroSub1: 'Plateforme d\'approvisionnement matériel chiffrée de qualité militaire.',
    heroSub2: 'Dispositifs compatibles Neural-link pour l\'opérateur moderne.',
    exploreInventory: 'EXPLORER L\'INVENTAIRE →',
    accessTerminal: 'ACCÉDER AU TERMINAL',
    encryption: 'CHIFFREMENT',
    uptime: 'DISPONIBILITÉ',
    hardware: 'MATÉRIEL',
    support: 'SUPPORT',
    searchPlaceholder: 'Rechercher par nom ou marque...',
    allProducts: 'Tous les produits',
    noProductsFound: 'AUCUN PRODUIT TROUVÉ',
    tryDifferentKeywords: 'Essayez d\'autres mots-clés',
    analysis: 'ANALYSE',
    add: 'AJOUTER',
    shoppingCart: 'Panier d\'achat',
    cartEmpty: 'Le panier est vide',
    total: 'TOTAL :',
    checkout: 'PAYER',
    productAnalysis: 'ANALYSE DU PRODUIT',
    removeFromFav: '❤️ RETIRER DES FAVORIS',
    addToFav: '🔖 AJOUTER AUX FAVORIS',
    addToCart: '🛒 AJOUTER AU PANIER',
    close: 'FERMER',
    detailedSpecs: 'SPÉCIFICATIONS DÉTAILLÉES',
    price: 'PRIX',
    brand: 'MARQUE',
    productId: 'ID PRODUIT',
    systemOnline: 'SYSTÈME EN LIGNE',
    operatorAccess: 'ACCÈS OPÉRATEUR',
    accessId: 'IDENTIFIANT',
    securityKey: 'CLÉ DE SÉCURITÉ',
    initSession: 'INITIER LA SESSION',
    registerAccess: 'CRÉER UN ACCÈS',
    noAccount: 'PAS DE COMPTE ?',
    haveAccount: 'DÉJÀ UN COMPTE ?',
    codename: 'NOM DE CODE',
    coreStatus: 'État du système',
    orders: 'Commandes',
    addresses: 'Adresses',
    favorites: 'Favoris',
    security: 'Sécurité',
    accountActivity: 'Activité du compte',
    feedback: 'Retour',
    authorized: 'AUTORISÉ',
    operatorMesh: 'OPÉRATEUR // NEXUS MESH',
    checkoutStep1: 'ÉTAPE 1/3',
    checkoutStep2: 'ÉTAPE 2/3',
    selectDelivery: 'SÉLECTIONNER L\'ADRESSE DE LIVRAISON',
    paymentDetails: 'DÉTAILS DE PAIEMENT',
    deliveryAddress: 'ADRESSE DE LIVRAISON',
    continueToPayment: 'CONTINUER VERS LE PAIEMENT →',
    cancel: 'ANNULER',
    cardholderName: 'NOM DU TITULAIRE',
    cardNumber: 'NUMÉRO DE CARTE',
    expiryDate: 'DATE D\'EXPIRATION (MM/AA)',
    cvv: 'CVV',
    confirmPayment: '💳 CONFIRMER LE PAIEMENT',
    processing: '⏳ EN COURS...',
    orderConfirmed: 'COMMANDE CONFIRMÉE !',
    orderPlaced: 'Votre commande a été passée avec succès.',
    orderNumber: 'NUMÉRO DE COMMANDE',
    totalAmount: 'MONTANT TOTAL',
    itemsCount: 'NOMBRE D\'ARTICLES',
    viewOrders: '→ VOIR LES COMMANDES',
    systemStatus: 'ÉTAT DU SYSTÈME',
    welcomeBack: 'Bon retour',
    accessMarket: 'ACCÉDER AU MARCHÉ',
    liveMetrics: 'MÉTRIQUES EN DIRECT',
    networkLatency: 'Latence Réseau',
    activeNodes: 'Nœuds Actifs',
    uplinkStatus: 'État de la Liaison',
    jsHeapUsed: 'Mémoire JS Utilisée',
    online: 'EN LIGNE',
    offline: 'HORS LIGNE',
    systemHealthMatrix: 'MATRICE DE SANTÉ SYSTÈME',
    cpuEstimate: 'ESTIMATION CPU',
    jsMemory: 'MÉMOIRE JS',
    network: 'RÉSEAU',
    storage: 'STOCKAGE',
    ordersModule: 'MODULE COMMANDES',
    myOrders: 'Mes Commandes',
    noOrdersFound: 'AUCUNE COMMANDE TROUVÉE',
    orderId: 'ID Commande',
    date: 'Date',
    status: 'Statut',
    removeFromView: '🗑 RETIRER DE LA VUE',
    remove: 'RETIRER',
    orderItems: 'ARTICLES DE LA COMMANDE',
    addressesModule: 'MODULE ADRESSES',
    myAddresses: 'Mes Adresses',
    noAddressFound: 'AUCUNE ADRESSE TROUVÉE',
    newAddress: '+ NOUVELLE ADRESSE',
    addFirstAddress: 'AJOUTER LA PREMIÈRE ADRESSE',
    addNewAddress: 'AJOUTER UNE ADRESSE',
    updateAddress: 'MODIFIER L\'ADRESSE',
    addressTitle: 'TITRE DE L\'ADRESSE',
    fullName: 'NOM COMPLET',
    phone: 'TÉLÉPHONE',
    city: 'VILLE',
    district: 'QUARTIER',
    addressDetails: 'DÉTAILS DE L\'ADRESSE',
    saveChanges: '✓ SAUVEGARDER',
    addAddress: '+ AJOUTER UNE ADRESSE',
    edit: 'MODIFIER',
    delete: 'SUPPRIMER',
    submitFeedback: 'ENVOYER UN RETOUR',
    deleteProduct: 'Supprimer le produit',
    deleteUser: 'Supprimer l\'utilisateur',
    permanentlyDeleted: 'Ce produit sera définitivement supprimé.',
    cannotBeUndone: 'Cette action est irréversible.',
    deleteBtn: 'SUPPRIMER',
    noProductsYet: 'AUCUN PRODUIT ENCORE',
    noApplicationsYet: 'AUCUNE CANDIDATURE ENCORE',
    accessId_placeholder: 'operateur@nexus.io',
    codename_placeholder: 'Entrez votre nom de code',
    securityKey_placeholder: '••••••••',
    securityModule: 'MODULE SÉCURITÉ',
    securityTitle: 'Sécurité & Compte',
    securitySubtitle: 'Gérez votre identité, vos identifiants et la sécurité de votre compte.',
    activeSession: 'SESSION ACTIVE',
    uploadPhoto: 'TÉLÉCHARGER UNE PHOTO',
    uploadPhotoHint: 'JPG, PNG ou WebP · max 2Mo',
    changePassword: 'Changer le mot de passe',
    changePasswordSub: 'Mettez à jour vos identifiants de connexion',
    currentPassword: 'MOT DE PASSE ACTUEL',
    newPassword: 'NOUVEAU MOT DE PASSE',
    confirmPassword: 'CONFIRMER LE MOT DE PASSE',
    updatePassword: '🔑 METTRE À JOUR LE MOT DE PASSE',
    updatingPassword: 'MISE À JOUR...',
    changeEmail: "Changer l\'e-mail",
    currentLabel: 'Actuel :',
    newEmailAddress: 'NOUVELLE ADRESSE E-MAIL',
    updateEmail: '📧 METTRE À JOUR L\'E-MAIL',
    updatingEmail: 'MISE À JOUR...',
    userIdLabel: 'ID UTILISATEUR',
    lastLoginLabel: 'DERNIÈRE CONNEXION',
    accountRoleLabel: 'RÔLE DU COMPTE',
    sendFeedbackTitle: 'Envoyer un retour',
    sendFeedbackSub: 'Votre retour est transmis directement au panneau admin.',
    feedbackReceived: 'RETOUR REÇU',
    feedbackRecordedMsg: 'Votre retour a été enregistré et envoyé au panneau admin.',
    categoryLabel: 'CATÉGORIE',
    experienceRating: 'ÉVALUATION DE L\'EXPÉRIENCE',
    subjectLabel: 'SUJET',
    messageLabel: 'MESSAGE',
    subjectPlaceholder: 'Entrez le titre du sujet...',
    messagePlaceholder: 'Décrivez votre retour en détail...',
    transmitting: '⏳ TRANSMISSION...',
    ratingTerrible: 'Terrible',
    ratingBad: 'Mauvais',
    ratingAverage: 'Moyen',
    ratingGood: 'Bien',
    ratingExcellent: 'Excellent',
    catGeneral: 'Général',
    catBugReport: 'Rapport de bug',
    catSuggestion: 'Suggestion',
    catSupport: 'Support',
    removeFromFavorites: '🗑 RETIRER DES FAVORIS',
    activityModule: 'MODULE ACTIVITÉ',
    accountActivityTitle: 'Activité du compte',
    loginLogoutHistory: 'HISTORIQUE CONNEXION / DÉCONNEXION',
    noSessionHistory: "Pas encore d\'historique de session",
    sessionOpened: 'Session ouverte',
    sessionClosed: 'Session fermée',
    fillAllFields: 'Veuillez remplir tous les champs',
    passwordsNoMatch: 'Les mots de passe ne correspondent pas',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
    passwordChanged: 'Mot de passe changé avec succès',
    validEmail: 'Veuillez entrer une adresse e-mail valide',
    emailUpdateSent: "Demande de mise à jour de l\'e-mail envoyée",
    connectionError: 'Erreur de connexion',
    profilePhotoUpdated: 'Photo de profil mise à jour',
    subjectRequired: 'Les champs sujet et message sont obligatoires.',
    selectRating: 'Veuillez sélectionner une note.',
    feedbackTransmitted: 'Retour transmis avec succès.',
    adminControlPanel: 'PANNEAU DE CONTRÔLE ADMIN',
    rootAccess: 'ACCÈS ROOT',
    adProducts: 'Produits',
    adUsers: 'Utilisateurs',
    adErrorLog: 'Journal des erreurs',
    adAuditLog: "Journal d'audit",
    adProductLog: 'Journal des produits',
    adFeedbackLog: 'Journal des retours',
    adRoleChangeLog: 'Journal des changements de rôle',
    adReturnHome: "RETOUR À L'ACCUEIL",
    adKillConnection: 'COUPER LA CONNEXION',
    adProductRegistry: 'REGISTRE DES PRODUITS',
    adUserRegistry: 'REGISTRE DES UTILISATEURS',
    adRecords: 'enregistrements',
    adSearchProducts: 'Rechercher des produits...',
    adSearchUsers: 'Rechercher des utilisateurs...',
    adNewProduct: '+ NOUVEAU PRODUIT',
    adClearAll: 'TOUT EFFACER',
    adName: 'NOM',
    adEmail: 'E-MAIL',
    adRole: 'RÔLE',
    adActions: 'ACTIONS',
    adNoProducts: 'Aucun produit trouvé',
    adNoUsers: 'Aucun utilisateur trouvé',
    adEdit: 'MODIFIER',
    adMakeUser: 'DÉFINIR UTILISATEUR',
    adMakeAdmin: 'DÉFINIR ADMIN',
    adDelete: 'SUPPRIMER',
    adProtected: 'PROTÉGÉ',
    adTimestamp: 'HORODATAGE',
    adType: 'TYPE',
    adMessage: 'MESSAGE',
    adUser: 'UTILISATEUR',
    adAction: 'ACTION',
    adSource: 'SOURCE',
    adSubject: 'SUJET',
    adRating: 'NOTE',
    adCategory: 'CATÉGORIE',
    adChangedBy: 'MODIFIÉ PAR',
    adTargetUser: 'UTILISATEUR CIBLE',
    adOldRole: 'ANCIEN RÔLE',
    adNewRole: 'NOUVEAU RÔLE',
    adNoErrors: 'Aucune erreur enregistrée',
    adNoAudit: "Aucun événement d'audit",
    adNoProductLog: 'Aucun événement produit',
    adNoFeedback: 'Aucun retour reçu',
    adNoRoleChange: 'Aucun changement de rôle',
    adAdminConsole: 'Console Admin',
    adRootActive: 'Accès Root Actif',
    adProductName: 'NOM DU PRODUIT *',
    adProductBrand: 'MARQUE DU PRODUIT',
    adProductPrice: 'PRIX DU PRODUIT (TL) *',
    adSaveChanges: 'SAUVEGARDER',
    adDeployProduct: 'DÉPLOYER LE PRODUIT',
    adProductImage: 'IMAGE DU PRODUIT'
  },
  de: {
    nexusMarket: 'NEXUS MARKET',
    login: 'ANMELDEN',
    adminPortal: 'ADMIN-PORTAL',
    myTerminal: 'MEIN TERMINAL',
    exit: 'ABMELDEN',
    heroBadge: 'NEXUS MARKET // ONLINE',
    heroTitle1: 'NEXT-GEN',
    heroTitle2: 'HARDWARE',
    quantumEncrypted: 'QUANTENVERSCHLÜSSELT',
    heroSub1: 'Militärische verschlüsselte Hardware-Beschaffungsplattform.',
    heroSub2: 'Neural-Link-kompatible Geräte für den modernen Operator.',
    exploreInventory: 'INVENTAR ERKUNDEN →',
    accessTerminal: 'TERMINAL ÖFFNEN',
    encryption: 'VERSCHLÜSSELUNG',
    uptime: 'VERFÜGBARKEIT',
    hardware: 'HARDWARE',
    support: 'SUPPORT',
    searchPlaceholder: 'Nach Produkten oder Marken suchen...',
    allProducts: 'Alle Produkte',
    noProductsFound: 'KEINE PRODUKTE GEFUNDEN',
    tryDifferentKeywords: 'Versuchen Sie andere Suchbegriffe',
    analysis: 'ANALYSE',
    add: 'HINZUFÜGEN',
    shoppingCart: 'Warenkorb',
    cartEmpty: 'Warenkorb ist leer',
    total: 'GESAMT:',
    checkout: 'BEZAHLEN',
    productAnalysis: 'PRODUKTANALYSE',
    removeFromFav: '❤️ AUS FAVORITEN ENTFERNEN',
    addToFav: '🔖 ZU FAVORITEN HINZUFÜGEN',
    addToCart: '🛒 IN DEN WARENKORB',
    close: 'SCHLIESSEN',
    detailedSpecs: 'DETAILLIERTE SPEZIFIKATIONEN',
    price: 'PREIS',
    brand: 'MARKE',
    productId: 'PRODUKT-ID',
    systemOnline: 'SYSTEM ONLINE',
    operatorAccess: 'OPERATOR-ZUGANG',
    accessId: 'ZUGANGS-ID',
    securityKey: 'SICHERHEITSSCHLÜSSEL',
    initSession: 'SITZUNG STARTEN',
    registerAccess: 'ZUGANG REGISTRIEREN',
    noAccount: 'KEIN KONTO?',
    haveAccount: 'BEREITS EIN KONTO?',
    codename: 'CODENAME',
    coreStatus: 'Systemstatus',
    orders: 'Bestellungen',
    addresses: 'Adressen',
    favorites: 'Favoriten',
    security: 'Sicherheit',
    accountActivity: 'Kontoaktivität',
    feedback: 'Feedback',
    authorized: 'AUTORISIERT',
    operatorMesh: 'OPERATOR // NEXUS MESH',
    checkoutStep1: 'CHECKOUT SCHRITT 1/3',
    checkoutStep2: 'CHECKOUT SCHRITT 2/3',
    selectDelivery: 'LIEFERADRESSE WÄHLEN',
    paymentDetails: 'ZAHLUNGSDETAILS',
    deliveryAddress: 'LIEFERADRESSE',
    continueToPayment: 'WEITER ZUR ZAHLUNG →',
    cancel: 'ABBRECHEN',
    cardholderName: 'KARTENINHABER',
    cardNumber: 'KARTENNUMMER',
    expiryDate: 'ABLAUFDATUM (MM/JJ)',
    cvv: 'CVV',
    confirmPayment: '💳 ZAHLUNG BESTÄTIGEN',
    processing: '⏳ VERARBEITUNG...',
    orderConfirmed: 'BESTELLUNG BESTÄTIGT!',
    orderPlaced: 'Ihre Bestellung wurde erfolgreich aufgegeben.',
    orderNumber: 'BESTELLNUMMER',
    totalAmount: 'GESAMTBETRAG',
    itemsCount: 'ARTIKELANZAHL',
    viewOrders: '→ BESTELLUNGEN ANZEIGEN',
    systemStatus: 'SYSTEMSTATUS',
    welcomeBack: 'Willkommen zurück',
    accessMarket: 'MARKT ÖFFNEN',
    liveMetrics: 'LIVE-METRIKEN',
    networkLatency: 'Netzwerklatenz',
    activeNodes: 'Aktive Knoten',
    uplinkStatus: 'Verbindungsstatus',
    jsHeapUsed: 'JS-Speicher genutzt',
    online: 'ONLINE',
    offline: 'OFFLINE',
    systemHealthMatrix: 'SYSTEM-GESUNDHEITSMATRIX',
    cpuEstimate: 'CPU-SCHÄTZUNG',
    jsMemory: 'JS-SPEICHER',
    network: 'NETZWERK',
    storage: 'SPEICHER',
    ordersModule: 'BESTELLMODUL',
    myOrders: 'Meine Bestellungen',
    noOrdersFound: 'KEINE BESTELLUNGEN GEFUNDEN',
    orderId: 'Bestell-ID',
    date: 'Datum',
    status: 'Status',
    removeFromView: '🗑 AUS ANSICHT ENTFERNEN',
    remove: 'ENTFERNEN',
    orderItems: 'BESTELLARTIKEL',
    addressesModule: 'ADRESSMODUL',
    myAddresses: 'Meine Adressen',
    noAddressFound: 'KEINE ADRESSE GEFUNDEN',
    newAddress: '+ NEUE ADRESSE',
    addFirstAddress: 'ERSTE ADRESSE HINZUFÜGEN',
    addNewAddress: 'NEUE ADRESSE HINZUFÜGEN',
    updateAddress: 'ADRESSE AKTUALISIEREN',
    addressTitle: 'ADRESSTITEL',
    fullName: 'VOLLSTÄNDIGER NAME',
    phone: 'TELEFON',
    city: 'STADT',
    district: 'BEZIRK',
    addressDetails: 'ADRESSDETAILS',
    saveChanges: '✓ ÄNDERUNGEN SPEICHERN',
    addAddress: '+ ADRESSE HINZUFÜGEN',
    edit: 'BEARBEITEN',
    delete: 'LÖSCHEN',
    submitFeedback: 'FEEDBACK SENDEN',
    deleteProduct: 'Produkt löschen',
    deleteUser: 'Benutzer löschen',
    permanentlyDeleted: 'Dieses Produkt wird dauerhaft gelöscht.',
    cannotBeUndone: 'Diese Aktion kann nicht rückgängig gemacht werden.',
    deleteBtn: 'LÖSCHEN',
    noProductsYet: 'NOCH KEINE PRODUKTE',
    noApplicationsYet: 'NOCH KEINE BEWERBUNGEN',
    accessId_placeholder: 'operator@nexus.io',
    codename_placeholder: 'Codename eingeben',
    securityKey_placeholder: '••••••••',
    securityModule: 'SICHERHEITSMODUL',
    securityTitle: 'Sicherheit & Konto',
    securitySubtitle: 'Verwalten Sie Ihre Identität, Zugangsdaten und Kontosicherheit.',
    activeSession: 'AKTIVE SITZUNG',
    uploadPhoto: 'FOTO HOCHLADEN',
    uploadPhotoHint: 'JPG, PNG oder WebP · max 2MB',
    changePassword: 'Passwort ändern',
    changePasswordSub: 'Aktualisieren Sie Ihre Anmeldedaten',
    currentPassword: 'AKTUELLES PASSWORT',
    newPassword: 'NEUES PASSWORT',
    confirmPassword: 'PASSWORT BESTÄTIGEN',
    updatePassword: '🔑 PASSWORT AKTUALISIEREN',
    updatingPassword: 'AKTUALISIERUNG...',
    changeEmail: 'E-Mail ändern',
    currentLabel: 'Aktuell:',
    newEmailAddress: 'NEUE E-MAIL-ADRESSE',
    updateEmail: '📧 E-MAIL AKTUALISIEREN',
    updatingEmail: 'AKTUALISIERUNG...',
    userIdLabel: 'BENUTZER-ID',
    lastLoginLabel: 'LETZTER LOGIN',
    accountRoleLabel: 'KONTOROLLE',
    sendFeedbackTitle: 'Feedback senden',
    sendFeedbackSub: 'Ihr Feedback wird direkt an das Admin-Panel weitergeleitet.',
    feedbackReceived: 'FEEDBACK ERHALTEN',
    feedbackRecordedMsg: 'Ihr Feedback wurde erfasst und an das Admin-Panel gesendet.',
    categoryLabel: 'KATEGORIE',
    experienceRating: 'ERFAHRUNGSBEWERTUNG',
    subjectLabel: 'BETREFF',
    messageLabel: 'NACHRICHT',
    subjectPlaceholder: 'Betreff eingeben...',
    messagePlaceholder: 'Beschreiben Sie Ihr Feedback im Detail...',
    transmitting: '⏳ ÜBERTRAGUNG...',
    ratingTerrible: 'Schrecklich',
    ratingBad: 'Schlecht',
    ratingAverage: 'Durchschnittlich',
    ratingGood: 'Gut',
    ratingExcellent: 'Ausgezeichnet',
    catGeneral: 'Allgemein',
    catBugReport: 'Fehlerbericht',
    catSuggestion: 'Vorschlag',
    catSupport: 'Support',
    removeFromFavorites: '🗑 AUS FAVORITEN ENTFERNEN',
    activityModule: 'AKTIVITÄTSMODUL',
    accountActivityTitle: 'Kontoaktivität',
    loginLogoutHistory: 'ANMELDE-/ABMELDEVERLAUF',
    noSessionHistory: 'Noch kein Sitzungsverlauf',
    sessionOpened: 'Sitzung geöffnet',
    sessionClosed: 'Sitzung geschlossen',
    fillAllFields: 'Bitte füllen Sie alle Felder aus',
    passwordsNoMatch: 'Passwörter stimmen nicht überein',
    passwordTooShort: 'Passwort muss mindestens 6 Zeichen lang sein',
    passwordChanged: 'Passwort erfolgreich geändert',
    validEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    emailUpdateSent: 'E-Mail-Aktualisierungsanfrage gesendet',
    connectionError: 'Verbindungsfehler',
    profilePhotoUpdated: 'Profilfoto aktualisiert',
    subjectRequired: 'Betreff und Nachricht sind Pflichtfelder.',
    selectRating: 'Bitte wählen Sie eine Bewertung aus.',
    feedbackTransmitted: 'Feedback erfolgreich übermittelt.',
    adminControlPanel: 'ADMIN-KONTROLLPANEL',
    rootAccess: 'ROOT-ZUGRIFF',
    adProducts: 'Produkte',
    adUsers: 'Benutzer',
    adErrorLog: 'Fehlerprotokoll',
    adAuditLog: 'Prüfprotokoll',
    adProductLog: 'Produktprotokoll',
    adFeedbackLog: 'Feedback-Protokoll',
    adRoleChangeLog: 'Rollenänderungsprotokoll',
    adReturnHome: 'ZUR STARTSEITE',
    adKillConnection: 'VERBINDUNG TRENNEN',
    adProductRegistry: 'PRODUKTVERZEICHNIS',
    adUserRegistry: 'BENUTZERVERZEICHNIS',
    adRecords: 'Einträge',
    adSearchProducts: 'Produkte suchen...',
    adSearchUsers: 'Benutzer suchen...',
    adNewProduct: '+ NEUES PRODUKT',
    adClearAll: 'ALLES LÖSCHEN',
    adName: 'NAME',
    adEmail: 'E-MAIL',
    adRole: 'ROLLE',
    adActions: 'AKTIONEN',
    adNoProducts: 'Keine Produkte gefunden',
    adNoUsers: 'Keine Benutzer gefunden',
    adEdit: 'BEARBEITEN',
    adMakeUser: 'ZUM BENUTZER MACHEN',
    adMakeAdmin: 'ZUM ADMIN MACHEN',
    adDelete: 'LÖSCHEN',
    adProtected: 'GESCHÜTZT',
    adTimestamp: 'ZEITSTEMPEL',
    adType: 'TYP',
    adMessage: 'NACHRICHT',
    adUser: 'BENUTZER',
    adAction: 'AKTION',
    adSource: 'QUELLE',
    adSubject: 'BETREFF',
    adRating: 'BEWERTUNG',
    adCategory: 'KATEGORIE',
    adChangedBy: 'GEÄNDERT VON',
    adTargetUser: 'ZIELBENUTZER',
    adOldRole: 'ALTE ROLLE',
    adNewRole: 'NEUE ROLLE',
    adNoErrors: 'Keine Fehler aufgezeichnet',
    adNoAudit: 'Keine Prüfereignisse aufgezeichnet',
    adNoProductLog: 'Keine Produktereignisse aufgezeichnet',
    adNoFeedback: 'Noch kein Feedback erhalten',
    adNoRoleChange: 'Keine Rollenänderungen aufgezeichnet',
    adAdminConsole: 'Admin-Konsole',
    adRootActive: 'Root-Zugriff Aktiv',
    adProductName: 'PRODUKTNAME *',
    adProductBrand: 'PRODUKTMARKE',
    adProductPrice: 'PRODUKTPREIS (TL) *',
    adSaveChanges: 'ÄNDERUNGEN SPEICHERN',
    adDeployProduct: 'PRODUKT HINZUFÜGEN',
    adProductImage: 'PRODUKTBILD'
  },
  tr: {
    nexusMarket: 'NEXUS MARKET',
    login: 'GİRİŞ',
    adminPortal: 'ADMİN PORTALI',
    myTerminal: 'TERMİNALİM',
    exit: 'ÇIKIŞ',
    heroBadge: 'NEXUS MARKET // ÇEVRIMIÇI',
    heroTitle1: 'YENİ NESİL',
    heroTitle2: 'DONANIM',
    quantumEncrypted: 'KUANTUM ŞİFRELEME',
    heroSub1: 'Askeri düzeyde şifreli donanım tedarik platformu.',
    heroSub2: 'Modern operatör için Sinir-bağlantısı uyumlu cihazlar.',
    exploreInventory: 'ENVANTERİ KEŞFET →',
    accessTerminal: 'TERMİNALE ERİŞ',
    encryption: 'ŞİFRELEME',
    uptime: 'ÇALIŞMA SÜRESİ',
    hardware: 'DONANIM',
    support: 'DESTEK',
    searchPlaceholder: 'Ürün adı veya markaya göre ara...',
    allProducts: 'Tüm Ürünler',
    noProductsFound: 'ÜRÜN BULUNAMADI',
    tryDifferentKeywords: 'Farklı anahtar kelimelerle deneyin',
    analysis: 'ANALİZ',
    add: 'EKLE',
    shoppingCart: 'Alışveriş Sepeti',
    cartEmpty: 'Sepet boş',
    total: 'TOPLAM:',
    checkout: 'ÖDEME YAP',
    productAnalysis: 'ÜRÜN ANALİZİ',
    removeFromFav: '❤️ FAVORİLERDEN ÇIKAR',
    addToFav: '🔖 FAVORİLERE EKLE',
    addToCart: '🛒 SEPETE EKLE',
    close: 'KAPAT',
    detailedSpecs: 'DETAYLI ÖZELLİKLER',
    price: 'FİYAT',
    brand: 'MARKA',
    productId: 'ÜRÜN ID',
    systemOnline: 'SİSTEM ÇEVRIMIÇI',
    operatorAccess: 'OPERATÖR ERİŞİMİ',
    accessId: 'ERİŞİM ID',
    securityKey: 'GÜVENLİK ANAHTARI',
    initSession: 'OTURUMU BAŞLAT',
    registerAccess: 'KAYIT OL',
    noAccount: 'HESABIN YOK MU?',
    haveAccount: 'ZATEN HESABIN VAR MI?',
    codename: 'KOD ADI',
    coreStatus: 'Sistem Durumu',
    orders: 'Siparişler',
    addresses: 'Adresler',
    favorites: 'Favoriler',
    security: 'Güvenlik',
    accountActivity: 'Hesap Aktivitesi',
    feedback: 'Geri Bildirim',
    authorized: 'YETKİLENDİRİLDİ',
    operatorMesh: 'OPERATÖR // NEXUS MESH',
    checkoutStep1: 'ÖDEME ADIMI 1/3',
    checkoutStep2: 'ÖDEME ADIMI 2/3',
    selectDelivery: 'TESLİMAT ADRESİ SEÇ',
    paymentDetails: 'ÖDEME DETAYLARI',
    deliveryAddress: 'TESLİMAT ADRESİ',
    continueToPayment: 'ÖDEMEYE DEVAM ET →',
    cancel: 'İPTAL',
    cardholderName: 'KART SAHİBİ ADI',
    cardNumber: 'KART NUMARASI',
    expiryDate: 'SON KULLANMA TARİHİ (AA/YY)',
    cvv: 'CVV',
    confirmPayment: '💳 ÖDEMEYİ ONAYLA',
    processing: '⏳ İŞLENİYOR...',
    orderConfirmed: 'SİPARİŞ ONAYLANDI!',
    orderPlaced: 'Siparişiniz başarıyla verildi.',
    orderNumber: 'SİPARİŞ NUMARASI',
    totalAmount: 'TOPLAM TUTAR',
    itemsCount: 'ÜRÜN SAYISI',
    viewOrders: '→ SİPARİŞLERİ GÖR',
    systemStatus: 'SİSTEM DURUMU',
    welcomeBack: 'Tekrar hoş geldin',
    accessMarket: 'PAZARA ERİŞ',
    liveMetrics: 'CANLI METRİKLER',
    networkLatency: 'Ağ Gecikmesi',
    activeNodes: 'Aktif Düğümler',
    uplinkStatus: 'Bağlantı Durumu',
    jsHeapUsed: 'JS Bellek Kullanımı',
    online: 'ÇEVRIMIÇI',
    offline: 'ÇEVRIMDIŞI',
    systemHealthMatrix: 'SİSTEM SAĞLIK MATRİSİ',
    cpuEstimate: 'CPU TAHMİNİ',
    jsMemory: 'JS BELLEK',
    network: 'AĞ',
    storage: 'DEPOLAMA',
    ordersModule: 'SİPARİŞ MODÜLÜ',
    myOrders: 'Siparişlerim',
    noOrdersFound: 'SİPARİŞ BULUNAMADI',
    orderId: 'Sipariş ID',
    date: 'Tarih',
    status: 'Durum',
    removeFromView: '🗑 GÖRÜNÜMDEN KALDIR',
    remove: 'KALDIR',
    orderItems: 'SİPARİŞ ÜRÜNLERİ',
    addressesModule: 'ADRES MODÜLÜ',
    myAddresses: 'Adreslerim',
    noAddressFound: 'ADRES BULUNAMADI',
    newAddress: '+ YENİ ADRES',
    addFirstAddress: 'İLK ADRESİ EKLE',
    addNewAddress: 'YENİ ADRES EKLE',
    updateAddress: 'ADRESİ GÜNCELLE',
    addressTitle: 'ADRES BAŞLIĞI',
    fullName: 'TAM AD',
    phone: 'TELEFON',
    city: 'ŞEHİR',
    district: 'İLÇE',
    addressDetails: 'ADRES DETAYLARI',
    saveChanges: '✓ DEĞİŞİKLİKLERİ KAYDET',
    addAddress: '+ ADRES EKLE',
    edit: 'DÜZENLE',
    delete: 'SİL',
    submitFeedback: 'GERİ BİLDİRİM GÖNDER',
    deleteProduct: 'Ürünü Sil',
    deleteUser: 'Kullanıcıyı Sil',
    permanentlyDeleted: 'Bu ürün kalıcı olarak silinecek.',
    cannotBeUndone: 'Bu işlem geri alınamaz.',
    deleteBtn: 'SİL',
    noProductsYet: 'HENÜZ ÜRÜN YOK',
    noApplicationsYet: 'HENÜZ BAŞVURU YOK',
    accessId_placeholder: 'operator@nexus.io',
    codename_placeholder: 'Kod adı girin',
    securityKey_placeholder: '••••••••',
    securityModule: 'GÜVENLİK MODÜLÜ',
    securityTitle: 'Güvenlik & Hesap',
    securitySubtitle: 'Kimliğinizi, kimlik bilgilerinizi ve hesap güvenliğinizi yönetin.',
    activeSession: 'AKTİF OTURUM',
    uploadPhoto: 'FOTOĞRAF YÜKLE',
    uploadPhotoHint: 'JPG, PNG veya WebP · maks 2MB',
    changePassword: 'Şifre Değiştir',
    changePasswordSub: 'Giriş bilgilerinizi güncelleyin',
    currentPassword: 'MEVCUT ŞİFRE',
    newPassword: 'YENİ ŞİFRE',
    confirmPassword: 'ŞİFREYİ ONAYLA',
    updatePassword: '🔑 ŞİFREYİ GÜNCELLE',
    updatingPassword: 'GÜNCELLENİYOR...',
    changeEmail: 'E-posta Değiştir',
    currentLabel: 'Mevcut:',
    newEmailAddress: 'YENİ E-POSTA ADRESİ',
    updateEmail: '📧 E-POSTAY GÜNCELLE',
    updatingEmail: 'GÜNCELLENİYOR...',
    userIdLabel: 'KULLANICI ID',
    lastLoginLabel: 'SON GİRİŞ',
    accountRoleLabel: 'HESAP ROLÜ',
    sendFeedbackTitle: 'Geri Bildirim Gönder',
    sendFeedbackSub: 'Geri bildiriminiz doğrudan yönetici paneline iletilir.',
    feedbackReceived: 'GERİ BİLDİRİM ALINDI',
    feedbackRecordedMsg: 'Geri bildiriminiz kaydedildi ve yönetici paneline gönderildi.',
    categoryLabel: 'KATEGORİ',
    experienceRating: 'DENEYİM PUANI',
    subjectLabel: 'KONU',
    messageLabel: 'MESAJ',
    subjectPlaceholder: 'Konu başlığı girin...',
    messagePlaceholder: 'Geri bildiriminizi detaylı açıklayın...',
    transmitting: '⏳ GÖNDERİLİYOR...',
    ratingTerrible: 'Çok Kötü',
    ratingBad: 'Kötü',
    ratingAverage: 'Orta',
    ratingGood: 'İyi',
    ratingExcellent: 'Mükemmel',
    catGeneral: 'Genel',
    catBugReport: 'Hata Bildirimi',
    catSuggestion: 'Öneri',
    catSupport: 'Destek',
    removeFromFavorites: '🗑 FAVORİLERDEN KALDIR',
    activityModule: 'AKTİVİTE MODÜLÜ',
    accountActivityTitle: 'Hesap Aktivitesi',
    loginLogoutHistory: 'GİRİŞ / ÇIKIŞ GEÇMİŞİ',
    noSessionHistory: 'Henüz oturum geçmişi yok',
    sessionOpened: 'Oturum Açıldı',
    sessionClosed: 'Oturum Kapatıldı',
    fillAllFields: 'Lütfen tüm alanları doldurun',
    passwordsNoMatch: 'Şifreler eşleşmiyor',
    passwordTooShort: 'Şifre en az 6 karakter olmalıdır',
    passwordChanged: 'Şifre başarıyla değiştirildi',
    validEmail: 'Lütfen geçerli bir e-posta adresi girin',
    emailUpdateSent: 'E-posta güncelleme isteği gönderildi',
    connectionError: 'Bağlantı hatası',
    profilePhotoUpdated: 'Profil fotoğrafı güncellendi',
    subjectRequired: 'Konu ve mesaj alanları zorunludur.',
    selectRating: 'Lütfen bir puan seçin.',
    feedbackTransmitted: 'Geri bildirim başarıyla iletildi.',
    adminControlPanel: 'YÖNETİCİ KONTROL PANELİ',
    rootAccess: 'KÖK ERİŞİM',
    adProducts: 'Ürünler',
    adUsers: 'Kullanıcılar',
    adErrorLog: 'Hata Günlüğü',
    adAuditLog: 'Denetim Günlüğü',
    adProductLog: 'Ürün Günlüğü',
    adFeedbackLog: 'Geri Bildirim Günlüğü',
    adRoleChangeLog: 'Rol Değişiklik Günlüğü',
    adReturnHome: 'ANA SAYFAYA DÖN',
    adKillConnection: 'BAĞLANTIYI KES',
    adProductRegistry: 'ÜRÜN KAYIT DEFTERİ',
    adUserRegistry: 'KULLANICI KAYIT DEFTERİ',
    adRecords: 'kayıt',
    adSearchProducts: 'Ürün ara...',
    adSearchUsers: 'Kullanıcı ara...',
    adNewProduct: '+ YENİ ÜRÜN',
    adClearAll: 'TÜMÜNÜ TEMİZLE',
    adName: 'AD',
    adEmail: 'E-POSTA',
    adRole: 'ROL',
    adActions: 'İŞLEMLER',
    adNoProducts: 'Ürün bulunamadı',
    adNoUsers: 'Kullanıcı bulunamadı',
    adEdit: 'DÜZENLE',
    adMakeUser: 'KULLANICI YAP',
    adMakeAdmin: 'YÖNETİCİ YAP',
    adDelete: 'SİL',
    adProtected: 'KORUNUYOR',
    adTimestamp: 'ZAMAN DAMGASI',
    adType: 'TİP',
    adMessage: 'MESAJ',
    adUser: 'KULLANICI',
    adAction: 'EYLEM',
    adSource: 'KAYNAK',
    adSubject: 'KONU',
    adRating: 'PUAN',
    adCategory: 'KATEGORİ',
    adChangedBy: 'DEĞİŞTİREN',
    adTargetUser: 'HEDEF KULLANICI',
    adOldRole: 'ESKİ ROL',
    adNewRole: 'YENİ ROL',
    adNoErrors: 'Hata kaydı yok',
    adNoAudit: 'Denetim olayı kaydı yok',
    adNoProductLog: 'Ürün olayı kaydı yok',
    adNoFeedback: 'Henüz geri bildirim yok',
    adNoRoleChange: 'Rol değişikliği kaydı yok',
    adAdminConsole: 'Yönetici Konsolu',
    adRootActive: 'Kök Erişim Aktif',
    adProductName: 'ÜRÜN ADI *',
    adProductBrand: 'ÜRÜN MARKASI',
    adProductPrice: 'ÜRÜN FİYATI (TL) *',
    adSaveChanges: 'DEĞİŞİKLİKLERİ KAYDET',
    adDeployProduct: 'ÜRÜN EKLE',
    adProductImage: 'ÜRÜN GÖRSELİ'
  },
};

const LANG_OPTIONS = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'tr', flag: '🇹🇷', label: 'TR' },
];

// --- REACT CONTEXT BASED LANGUAGE SYSTEM ---
const LangContext = React.createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

// Global lang değişkenini window'a bağla - her component anında görsün
function getLang() {
  try { return localStorage.getItem('nexus_lang') || 'en'; } catch { return 'en'; }
}

function LangProvider({ children }) {
  const [lang, setLangRaw] = React.useState(getLang);

  const setLang = (code) => {
    try { localStorage.setItem('nexus_lang', code); } catch {}
    setLangRaw(code);
    // Tüm component'lere bildir
    window.dispatchEvent(new CustomEvent('nexus-lang-change', { detail: code }));
  };

  const t = (key) => (translations[lang]?.[key]) || translations['en'][key] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

function useTranslation() {
  const ctx = React.useContext(LangContext);
  const [localLang, setLocalLang] = React.useState(getLang);
  React.useEffect(() => {
    const handler = (e) => {
      const code = e.detail || getLang();
      setLocalLang(code);
    };
    window.addEventListener('nexus-lang-change', handler);
    return () => window.removeEventListener('nexus-lang-change', handler);
  }, []);
  // Context available: use it (always fresh). Otherwise fallback to localLang.
  if (ctx && ctx.setLang !== (() => {})) {
    return ctx;
  }
  // Fallback: context not available, use local state
  const lang = localLang;
  const t = (key) => (translations[lang]?.[key]) || translations['en'][key] || key;
  const setLang = (code) => {
    try { localStorage.setItem('nexus_lang', code); } catch {}
    setLocalLang(code);
    window.dispatchEvent(new CustomEvent('nexus-lang-change', { detail: code }));
  };
  return { lang, setLang, t };
}

// Language Picker Component
function LanguagePicker() {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const current = LANG_OPTIONS.find(l => l.code === lang) || LANG_OPTIONS[0];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 12px', width: '100%', justifyContent: 'center',
          background: 'rgba(59,130,246,0.12)', border: `1px solid ${theme.accent}`,
          borderRadius: '8px', cursor: 'pointer', color: theme.accent,
          fontWeight: 900, fontSize: '12px', letterSpacing: '1px',
          height: '40px', boxSizing: 'border-box', transition: 'all 0.2s',
        }}
      >
        <span style={{ fontSize: '16px', lineHeight: 1 }}>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ fontSize: '9px', opacity: 0.7, marginLeft: '4px' }}>{open ? '▼' : '▲'}</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 199 }} />
          <div style={{
            position: 'absolute', bottom: '100%', left: 0, right: 0,
            marginBottom: '8px', background: theme.card,
            border: `1px solid ${theme.accent}`, borderRadius: '10px',
            zIndex: 200, overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(59,130,246,0.25)',
          }}>
            {LANG_OPTIONS.map(opt => (
              <button key={opt.code}
                onClick={() => { setLang(opt.code); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  width: '100%', padding: '10px 14px',
                  background: lang === opt.code ? 'rgba(59,130,246,0.15)' : 'transparent',
                  border: 'none',
                  borderLeft: `3px solid ${lang === opt.code ? theme.accent : 'transparent'}`,
                  color: lang === opt.code ? theme.accent : theme.text,
                  cursor: 'pointer', fontWeight: lang === opt.code ? 900 : 700,
                  fontSize: '12px', letterSpacing: '1px',
                  transition: 'background 0.15s', boxSizing: 'border-box',
                }}
              >
                <span style={{ fontSize: '17px', lineHeight: 1 }}>{opt.flag}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// --- IN-APP LOG STORE — localStorage backed (survives F5) ---
const _LS_KEY = 'nexus_logs';
const _LS_CTR = 'nexus_logs_ctr';

const _loadLogs = () => {
  try {
    const raw = localStorage.getItem(_LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { errors: [], audit: [], product: [], feedback: [], rolechange: [] };
};

const _saveLogs = () => {
  try {
    localStorage.setItem(_LS_KEY, JSON.stringify({
      errors:     logStore.errors,
      audit:      logStore.audit,
      product:    logStore.product,
      feedback:   logStore.feedback,
      rolechange: logStore.rolechange,
    }));
  } catch (_) {}
};

const _saved = _loadLogs();
const logStore = {
  errors:     _saved.errors      || [],
  audit:      _saved.audit       || [],
  product:    _saved.product     || [],
  feedback:   _saved.feedback    || [],
  rolechange: _saved.rolechange  || [],
};

let _logIdCounter = (() => {
  try { return parseInt(localStorage.getItem(_LS_CTR) || '1', 10); } catch (_) { return 1; }
})();

const addLog = (channel, data) => {
  const entry = {
    id: _logIdCounter++,
    timestamp: new Date().toISOString(),
    data,
  };
  try { localStorage.setItem(_LS_CTR, String(_logIdCounter)); } catch (_) {}
  const key = channel.toLowerCase();
  if      (key === 'error')      logStore.errors.unshift(entry);
  else if (key === 'audit')      logStore.audit.unshift(entry);
  else if (key === 'product')    logStore.product.unshift(entry);
  else if (key === 'feedback')   logStore.feedback.unshift(entry);
  else if (key === 'rolechange') logStore.rolechange.unshift(entry);
  _saveLogs();
  // Notify any mounted AdminDashboard to re-render
  window.dispatchEvent(new CustomEvent('nexus-log-update'));
};

const GlobalScrollStyle = () => (
  <style>{`
    *::-webkit-scrollbar {
      display: none !important;
    }
    * {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
  `}</style>
);



function App() {
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  // Modalın açık olup olmadığını takip etmek için bir state (Eğer StoreFront'ta varsa oradan buraya çekebilirsin)
  // Şimdilik genel bir kontrol mekanizması ekliyoruz
  
  // GLOBAL ERROR CATCHER
  useEffect(() => {
    const handleGlobalError = (event) => {
      event.preventDefault();
      const msg = event.message || 'Unknown Error';
      addLog('ERROR', { type: 'GLOBAL_CRASH', message: msg, file: event.filename || 'App.jsx' });
    };
    
    const handlePromiseRejection = (event) => {
      event.preventDefault();
      const msg = event.reason?.message || String(event.reason) || 'Unknown Asynchronous Error';
      addLog('ERROR', { type: 'PROMISE_REJECTED', message: msg });
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  // --- YENİ EKLENEN: MODAL AÇIKKEN ARKA PLANI KİLİTLEME VE SCROLLBAR GİZLEME ---
  useEffect(() => {
    const handleScrollLock = () => {
      // Sayfada herhangi bir modal (selectedProduct) veya overlay olup olmadığını kontrol et
      const isModalOpen = document.body.innerText.includes('PRODUCT ANALYSIS') || document.querySelector('.modal-overlay');
      
      if (isModalOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    };

    // DOM değişikliklerini izle (Modal açıldığında yakalamak için)
    const observer = new MutationObserver(handleScrollLock);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Toast fonksiyonun ve diğer logiclerin...

  const _lastToastRef = useRef('');

  const showSystemToast = (msg, type = 'error') => {
    // Deduplicate: ignore if the same message is already showing
    if (msg === _lastToastRef.current) return;
    _lastToastRef.current = msg;
    setTimeout(() => { _lastToastRef.current = ''; }, 4500);

    setToast({ show: true, message: msg, type: type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);

    // Log UI level errors
    if (type === 'error') {
      addLog('ERROR', { type: 'SYSTEM_TOAST', message: msg });
    }
  };

  return (
    <LangProvider><Router>
      {/* Global stil bileşenini buraya yerleştirdik */}
      <GlobalScrollStyle /> 
      
      <div style={{ 
        background: theme.bg, 
        color: theme.text, 
        minHeight: '100vh', 
        width: '100%', 
        fontFamily: '"Inter", sans-serif',
        overflowX: 'hidden' // Yatay kaymayı da engellemek için
      }}>
        
        {toast.show && (
          <div style={toastStyles(toast.type)}>
            <div style={toastBar(toast.type)}></div>
            <span>{toast.type === 'error' ? '🚨 ' : '✅ '} {toast.message.toUpperCase()}</span>
          </div>
        )}

        <Routes>
          <Route path="/" element={<StoreFront showToast={showSystemToast} />} />
          <Route path="/login" element={<AuthPage showToast={showSystemToast} />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute showToast={showSystemToast} />
          } />

          <Route path="/admin" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router></LangProvider>
  )
}

const ProtectedRoute = ({ showToast }) => {
  const token = localStorage.getItem('token');
  const [role, setRole] = React.useState(() => localStorage.getItem('userRole'));

  React.useEffect(() => {
    const onPromoted = () => {
      const newRole = localStorage.getItem('userRole');
      setRole(newRole);
    };
    window.addEventListener('nexus-role-promoted', onPromoted);
    window.addEventListener('nexus-log-update', onPromoted);
    return () => {
      window.removeEventListener('nexus-role-promoted', onPromoted);
      window.removeEventListener('nexus-log-update', onPromoted);
    };
  }, []);

  if (!token) return <Navigate to="/login" />;
  if (role === 'admin') return <AdminDashboard showToast={showToast} />;
  return <UserDashboard showToast={showToast} />;
}

// --- USER DASHBOARD (ULTRA-MODERN REDESIGN) ---
function UserDashboard({ showToast }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const [, forceUpdate] = useState(0);
  const userName = localStorage.getItem('userName') || 'OPERATOR';
  const userEmail = localStorage.getItem('userEmail') || '';
  const userId = localStorage.getItem('userId') || '';
  const navigate = useNavigate();

  useEffect(() => { document.title = 'NEXUS'; }, []);

  // Re-render on language change
  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    window.addEventListener('nexus-lang-change', handler);
    return () => window.removeEventListener('nexus-lang-change', handler);
  }, []);

  // Track login time
  useEffect(() => {
    const loginTime = new Date().toISOString();
    const sessions = JSON.parse(localStorage.getItem('nexus_sessions') || '[]');
    sessions.unshift({ type: 'login', time: loginTime, user: userName });
    if (sessions.length > 50) sessions.pop();
    localStorage.setItem('nexus_sessions', JSON.stringify(sessions));
    localStorage.setItem('nexus_last_login', loginTime);
    addLog('AUDIT', { user: userName, action: 'SESSION_START', source: 'USER' });
  }, []);

  const menu = [
    { id: 'home',       labelKey: 'coreStatus',       icon: '🚀' },
    { id: 'orders',     labelKey: 'orders',            icon: '💎' },
    { id: 'address',    labelKey: 'addresses',         icon: '🌐' },
    { id: 'favorites',  labelKey: 'favorites',         icon: '🔖' },
    { id: 'security',   labelKey: 'security',          icon: '🔐' },
    { id: 'activity',   labelKey: 'accountActivity',   icon: '📊' },
    { id: 'feedback',   labelKey: 'feedback',          icon: '💬' },
  ];

  const handleLogout = () => {
    try {
      const logoutTime = new Date().toISOString();
      const sessions = JSON.parse(localStorage.getItem('nexus_sessions') || '[]');
      sessions.unshift({ type: 'logout', time: logoutTime, user: userName });
      if (sessions.length > 50) sessions.pop();
      localStorage.setItem('nexus_sessions', JSON.stringify(sessions));
      addLog('AUDIT', { user: userName, action: "TERMINAL_EXIT", source: 'USER' });
      localStorage.clear();
      navigate('/login');
    } catch(err) {
      addLog('ERROR', { type: 'LOGOUT_ERROR', message: err.message });
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: '#050507' }}>
      <style>{`
        @keyframes udPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes udScan { 0%{top:-2px} 100%{top:100%} }
        @keyframes udGlow { 0%,100%{box-shadow:0 0 15px rgba(59,130,246,0.2)} 50%{box-shadow:0 0 35px rgba(59,130,246,0.5)} }
        @keyframes udFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes udFadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes udBar { from{width:0} to{width:var(--w)} }
        .ud-nav-btn:hover { background: rgba(59,130,246,0.08) !important; color: #fff !important; }
        .ud-action-btn:hover { background: rgba(255,255,255,0.07) !important; color: #fff !important; }
        .ud-stat-card:hover { border-color: rgba(59,130,246,0.4) !important; transform: translateY(-2px); transition: all 0.2s; }
        .ud-primary-btn:hover { background: #2563eb !important; transform: translateY(-1px); box-shadow: 0 8px 25px rgba(59,130,246,0.45) !important; }
        .ud-secondary-btn:hover { background: rgba(255,255,255,0.08) !important; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div style={{ width: '260px', borderRight: `1px solid ${theme.border}`, background: 'rgba(8,8,12,0.95)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50 }}>
        {/* Sidebar scan line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />

        {/* Avatar section */}
        <div style={{ padding: '35px 25px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
          {/* Animated avatar ring */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${theme.accent}`, opacity: 0.4, animation: 'udGlow 3s ease-in-out infinite' }} />
            <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: `linear-gradient(135deg, ${theme.accent}, #1d4ed8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: 900, color: '#fff', boxShadow: `0 0 25px ${theme.accentGlow}`, overflow: 'hidden' }}>{(() => { const av = localStorage.getItem('userAvatar'); return av ? <img src={av} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="avatar" /> : userName[0]; })()}</div>
            <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '12px', height: '12px', background: theme.success, borderRadius: '50%', border: '2px solid #050507', animation: 'udPulse 2s ease-in-out infinite' }} />
          </div>
          <div style={{ fontWeight: 900, fontSize: '13px', letterSpacing: '2.5px', color: theme.text }}>{userName.toUpperCase()}</div>
          <div style={{ fontSize: '9px', color: theme.accent, marginTop: '5px', fontWeight: 700, letterSpacing: '1px' }}>{t('operatorMesh')}</div>
          <div style={{ marginTop: '12px', padding: '4px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '20px', fontSize: '9px', color: theme.success, fontWeight: 800, letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: theme.success, animation: 'udPulse 2s infinite' }} />
            {t('authorized')}
          </div>
        </div>

        {/* Divider */}
        <div style={{ margin: '0 20px', height: '1px', background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)` }} />

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {menu.map((item, i) => {
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} className="ud-nav-btn" onClick={() => setActiveTab(item.id)}
                style={{ width: '100%', padding: '12px 16px', background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent', border: isActive ? `1px solid rgba(59,130,246,0.25)` : '1px solid transparent', color: isActive ? '#fff' : theme.subText, display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: 700, borderRadius: '10px', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}>
                {isActive && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: theme.accent, borderRadius: '0 3px 3px 0' }} />}
                <span style={{ fontSize: '15px', marginRight: '12px' }}>{item.icon}</span>
                <span style={{ flex: 1, textAlign: 'left' }}>{t(item.labelKey)}</span>
                {isActive && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: theme.accent, animation: 'udPulse 2s infinite' }} />}
              </button>
            );
          })}
        </nav>

        {/* Bottom buttons */}
        <div style={{ padding: '16px 12px', borderTop: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button className="ud-action-btn" onClick={() => navigate('/')}
            style={{ padding: '11px 16px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}`, color: theme.subText, borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏪 MARKET INTERFACE
          </button>
          <button onClick={handleLogout}
            style={{ padding: '11px 16px', background: 'rgba(239,68,68,0.06)', border: `1px solid rgba(239,68,68,0.2)`, color: theme.danger, borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⏻ KILL CONNECTION
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Hero header */}
        <div style={{ position: 'relative', width: '100%', height: '200px', background: 'linear-gradient(135deg, #050507 0%, #0b0b14 60%, #050507 100%)', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
          {/* Grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.25 }} />
          {/* Glow */}
          <div style={{ position: 'absolute', left: '20%', top: '50%', transform: 'translate(-50%,-50%)', width: '350px', height: '350px', background: `radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)`, filter: 'blur(30px)', animation: 'udFloat 7s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', right: '15%', top: '50%', transform: 'translateY(-50%)', width: '200px', height: '200px', background: `radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)`, filter: 'blur(20px)' }} />
          {/* Scan line */}
          <div style={{ position: 'absolute', left: 0, width: '100%', height: '1px', background: `linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)`, animation: 'udScan 5s linear infinite' }} />
          {/* Corner accents */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '50px', height: '50px', borderTop: `2px solid rgba(59,130,246,0.5)`, borderLeft: `2px solid rgba(59,130,246,0.5)` }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50px', height: '50px', borderBottom: `2px solid rgba(59,130,246,0.3)`, borderRight: `2px solid rgba(59,130,246,0.3)` }} />

          <div style={{ position: 'relative', zIndex: 2, padding: '0 50px' }}>
            <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '5px', marginBottom: '10px', opacity: 0.9 }}>NEURAL LINK ACTIVE</div>
            <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '0 0 8px 0', color: '#ffff', letterSpacing: '-1px' }}>Command Console</h1>
            <div style={{ fontSize: '12px', color: theme.subText, fontWeight: 600 }}>
              Welcome, <span style={{ color: theme.text, fontWeight: 900 }}>{userName}</span> — All systems operational
            </div>
          </div>

          {/* Right side live stats strip */}
          <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '20px', zIndex: 2, alignItems: 'center' }}>
            {[{ label: 'LATENCY', val: '14ms', color: theme.accent }, { label: 'UPTIME', val: '99.9%', color: theme.success }, { label: 'NODES', val: '03', color: '#8b5cf6' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '12px 18px', background: 'rgba(0,0,0,0.4)', border: `1px solid ${theme.border}`, borderRadius: '10px', backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: '9px', color: theme.subText, fontWeight: 800, letterSpacing: '1px', marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, padding: '40px 50px', animation: 'udFadeIn 0.4s ease-out' }}>

          {activeTab === 'home' && (
            <SystemHomeTab userName={userName} navigate={navigate} />
          )}

          {activeTab === 'orders' && <OrdersTab showToast={showToast} />}
          {activeTab === 'address' && <AddressTab showToast={showToast} />}
          {activeTab === 'favorites' && <FavoritesTab showToast={showToast} navigate={navigate} />}
          {activeTab === 'security' && <SecurityTab showToast={showToast} userName={userName} userId={userId} userEmail={userEmail} />}
          {activeTab === 'activity' && <ActivityTab userName={userName} />}
          {activeTab === 'apply' && <ApplyTab showToast={showToast} userName={userName} userEmail={userEmail} userId={userId} />}
          {activeTab === 'feedback' && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <UserFeedback showToast={showToast} userName={userName} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- USER DASHBOARD NEW STYLES ---
const userSideBtn = { width: '100%', padding: '14px 20px', background: 'transparent', border: 'none', color: theme.subText, display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '13px', fontWeight: 700, borderRadius: '8px', marginBottom: '4px', transition: '0.2s' };
const userSideBtnActive = { ...userSideBtn, color: '#fff', background: 'rgba(59, 130, 246, 0.1)' };
const userActionBtn = { width: '100%', padding: '12px', background: 'transparent', border: `1px solid ${theme.border}`, borderRadius: '8px', fontSize: '11px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', color: theme.text };
const userStatCard = { background: theme.card, border: `1px solid ${theme.border}`, padding: '25px', borderRadius: '16px' };
const userStatLabel = { fontSize: '10px', color: theme.subText, fontWeight: 800, letterSpacing: '1.5px', marginBottom: '12px' };
const userStatValue = { fontSize: '24px', fontWeight: 900, color: theme.text };
const userFeatureCard = { background: 'linear-gradient(135deg, #0d0d10 0%, #151520 100%)', border: `1px solid ${theme.border}`, padding: '40px', borderRadius: '24px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' };
const userCardGlow = { position: 'absolute', right: '-50px', top: '-50px', width: '200px', height: '200px', background: theme.accent, filter: 'blur(100px)', opacity: 0.15 };
const userPrimaryBtn = { padding: '12px 25px', background: theme.accent, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '12px', boxShadow: `0 4px 15px ${theme.accentGlow}` };
const userSecondaryBtn = { padding: '12px 25px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: `1px solid ${theme.border}`, borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '12px' };
const userMiniLog = { fontSize: '11px', color: theme.subText, display: 'flex', alignItems: 'center', gap: '10px' };
const userLogDot = { width: '4px', height: '4px', background: theme.accent, borderRadius: '50%' };
const userMainCard = { background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '30px' };
const userTh = { textAlign: 'left', padding: '15px 20px', borderBottom: `1px solid ${theme.border}` };
const userTd = { padding: '20px', fontSize: '14px', textAlign: 'left' };
const userBadge = { padding: '4px 10px', background: 'rgba(16, 185, 129, 0.1)', color: theme.success, borderRadius: '6px', fontSize: '10px', fontWeight: 900 };

// --- ORDERS TAB ---
function OrdersTab({ showToast }) {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hiddenOrders, setHiddenOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hiddenOrders') || '[]'); } catch { return []; }
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8001/api/orders', {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    })
      .then(r => r.json())
      .then(d => { setOrders(Array.isArray(d) ? d : []); setLoading(false); })
      .catch((err) => { 
        setLoading(false); 
        addLog('ERROR', { type: "ORDERS_FETCH_FAIL", message: err.message });
        showToast('An error occurred while loading the orders.', 'error');
      });
  }, []);

  const hideOrder = (id) => {
    const updated = [...hiddenOrders, id];
    setHiddenOrders(updated);
    localStorage.setItem('hiddenOrders', JSON.stringify(updated));
    if (selectedOrder?.id === id) setSelectedOrder(null);
    showToast('Order removed from view', 'success');
  };

  const visibleOrders = orders.filter(o => !hiddenOrders.includes(o.id));

  if (loading) return (
    <div style={{ ...userMainCard, textAlign: 'center', padding: '80px 0' }}>
      <div style={{ color: theme.subText, fontWeight: 800, letterSpacing: '2px' }}>LOADING ORDERS...</div>
    </div>
  );

if (selectedOrder) return (
    <div style={{ ...userMainCard, color: theme.text }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', paddingBottom: '20px', borderBottom: `1px solid ${theme.border}` }}>
        <button onClick={() => setSelectedOrder(null)} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}`, color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 800 }}>← BACK</button>
        <div>
          <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '2px' }}>ORDER DETAIL</div>
          <div style={{ fontWeight: 900, fontSize: '18px', color: theme.text }}>#{selectedOrder.id}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, marginBottom: '8px' }}>STATUS</div>
          <span style={{ ...userBadge, fontSize: '12px', padding: '6px 14px' }}>{(selectedOrder.status || 'PENDING').toUpperCase()}</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, marginBottom: '8px' }}>TOTAL</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: theme.accent }}>{selectedOrder.total || selectedOrder.total_price || '—'} ₺</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, marginBottom: '8px' }}>DATE</div>
          <div style={{ fontWeight: 700, color: theme.text }}>{selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleDateString('tr-TR') : '—'}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, marginBottom: '8px' }}>ITEMS</div>
          <div style={{ fontWeight: 700, color: theme.text }}>{selectedOrder.items?.length || selectedOrder.order_items?.length || '—'}</div>
        </div>
      </div>
      {(() => {
        const itemsList = selectedOrder?.items || selectedOrder?.order_items || [];
        return itemsList && itemsList.length > 0 ? (
          <div>
            <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, letterSpacing: '2px', marginBottom: '15px' }}>{t('orderItems')}</div>
            {itemsList.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontWeight: 800, color: theme.text }}>{item.product?.name || item.name || `Product #${item.product_id}`}</div>
                  <div style={{ fontSize: '12px', color: theme.subText, marginTop: '3px' }}>Qty: {item.quantity || 1}</div>
                </div>
                <div style={{ fontWeight: 900, color: theme.accent }}>{item.price || '0'} ₺</div>
              </div>
            ))}
          </div>
        ) : null;
      })()}
      <button onClick={() => hideOrder(selectedOrder.id)} style={{ marginTop: '20px', padding: '10px 20px', background: 'rgba(239,68,68,0.1)', border: `1px solid rgba(239,68,68,0.3)`, color: theme.danger, borderRadius: '8px', cursor: 'pointer', fontWeight: 800, fontSize: '12px' }}>
        {t('removeFromView')}
      </button>
    </div>
  );

  return (
    <div style={userMainCard}>
      <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '3px', marginBottom: '6px' }}>{t('ordersModule')}</div>
        <h3 style={{ margin: 0, fontSize: '20px', color: theme.text }}>{t('myOrders')}</h3>
      </div>
      {visibleOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>📦</div>
          <div style={{ fontWeight: 900, color: theme.subText, letterSpacing: '2px' }}>{t('noOrdersFound')}</div>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: theme.subText, fontSize: '11px', textTransform: 'uppercase', textAlign: 'left' }}>
              <th style={userTh}>{t('orderId')}</th>
              <th style={userTh}>{t('date')}</th>
              <th style={userTh}>{t('status')}</th>
              <th style={userTh}>{t('total')}</th>
              <th style={userTh}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map(order => (
              <tr key={order.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ ...userTd, color: theme.accent, fontWeight: 900 }}>#{order.id}</td>
                <td style={userTd}>{order.created_at ? new Date(order.created_at).toLocaleDateString('tr-TR') : '—'}</td>
                <td style={userTd}><span style={userBadge}>{(order.status || 'PENDING').toUpperCase()}</span></td>
                <td style={{ ...userTd, fontWeight: 800 }}>{order.total || order.total_price || '—'} ₺</td>
                <td style={userTd}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => hideOrder(order.id)} style={{ padding: '6px 14px', background: 'rgba(239,68,68,0.08)', border: `1px solid rgba(239,68,68,0.3)`, color: theme.danger, borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>{t('remove')}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// --- ADDRESS TAB ---
function AddressTab({ showToast }) {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('userAddresses') || '[]'); } catch { return []; }
  });
  const [modal, setModal] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ title: '', fullName: '', phone: '', city: '', district: '', address: '' });

  const saveToStorage = (list) => {
    localStorage.setItem('userAddresses', JSON.stringify(list));
    setAddresses(list);
  };

  const openAdd = () => {
    setForm({ title: '', fullName: '', phone: '', city: '', district: '', address: '' });
    setEditIndex(null);
    setModal('add');
  };

  const openEdit = (i) => {
    setForm(addresses[i]);
    setEditIndex(i);
    setModal('edit');
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.fullName.trim() || !form.address.trim() || !form.city.trim()) {
      showToast('Title, name, city and address are required.', 'error');
      return;
    }
    let updated;
    if (modal === 'edit') {
      updated = addresses.map((a, i) => i === editIndex ? form : a);
    } else {
      updated = [...addresses, form];
    }
    saveToStorage(updated);
    setModal(null);
    showToast(modal === 'edit' ? 'Address updated.' : 'Address added.', 'success');
  };

  const handleDelete = (i) => {
    const updated = addresses.filter((_, idx) => idx !== i);
    saveToStorage(updated);
    showToast('Address deleted.', 'success');
  };

  const inputStyle = { ...fbInput, width: '100%', boxSizing: 'border-box' };

  return (
    <div>
      {modal && (
        <div onClick={e => { if (e.target === e.currentTarget) setModal(null); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderTop: `3px solid ${theme.accent}`, borderRadius: '12px', padding: '35px', width: '520px', maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
            <style>{`::-webkit-scrollbar { display: none; }`}</style>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div style={{ fontWeight: 900, fontSize: '15px', letterSpacing: '1px', color: theme.text }}>{modal === 'edit' ? t('updateAddress') : t('newAddress')}</div>
              <button onClick={() => setModal(null)} style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.subText, width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <div style={fbLabel}>{t('addressTitle')}</div>
                <input style={inputStyle} placeholder="e.g. Home, Work" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <div style={fbLabel}>{t('fullName')}</div>
                <input style={inputStyle} placeholder="Name Surname" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div>
                <div style={fbLabel}>{t('phone')}</div>
                <input style={inputStyle} placeholder="0555 555 55 55" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <div style={fbLabel}>{t('city')}</div>
                  <input style={inputStyle} placeholder="Istanbul" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                </div>
                <div>
                  <div style={fbLabel}>{t('district')}</div>
                  <input style={inputStyle} placeholder="Kadıköy" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} />
                </div>
              </div>
              <div>
                <div style={fbLabel}>{t('addressDetails')}</div>
                <textarea style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} rows={3} placeholder="Street, neighborhood, building no..." value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>
              <button onClick={handleSave} style={{ padding: '14px', background: theme.accent, color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '13px', letterSpacing: '1px', boxShadow: `0 4px 20px ${theme.accentGlow}` }}>
                {modal === 'edit' ? t('saveChanges') : t('addAddress')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '3px', marginBottom: '6px' }}>{t('addressesModule')}</div>
          <h3 style={{ margin: 0, fontSize: '20px', color: theme.text }}>{t('myAddresses')}</h3>
        </div>
        <button onClick={openAdd} style={{ padding: '12px 22px', background: theme.accent, color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '12px', boxShadow: `0 4px 15px ${theme.accentGlow}` }}>{t('newAddress')}</button>
      </div>

      {addresses.length === 0 ? (
        <div style={{ ...userMainCard, textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>🌐</div>
          <div style={{ fontWeight: 900, color: theme.subText, letterSpacing: '2px', marginBottom: '20px' }}>{t('noAddressFound')}</div>
          <button onClick={openAdd} style={userSecondaryBtn}>{t('addFirstAddress')}</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {addresses.map((addr, i) => (
            <div key={i} style={{ ...userStatCard, position: 'relative' }}>
              <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '1.5px', marginBottom: '8px' }}>{addr.title.toUpperCase()}</div>
              <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '5px', color: theme.text }}>{addr.fullName}</div>
              {addr.phone && <div style={{ fontSize: '13px', color: theme.subText, marginBottom: '5px' }}>{addr.phone}</div>}
              <div style={{ fontSize: '13px', color: theme.subText }}>{addr.district ? `${addr.district}, ` : ''}{addr.city}</div>
              <div style={{ fontSize: '12px', color: theme.subText, marginTop: '4px', lineHeight: 1.5 }}>{addr.address}</div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => openEdit(i)} style={{ flex: 1, padding: '9px', background: 'rgba(59,130,246,0.1)', border: `1px solid ${theme.accent}`, color: theme.accent, borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>{t('edit')}</button>
                <button onClick={() => handleDelete(i)} style={{ flex: 1, padding: '9px', background: 'rgba(239,68,68,0.08)', border: `1px solid rgba(239,68,68,0.3)`, color: theme.danger, borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>{t('delete')}</button>
              </div>
            </div>
          ))}
          <div onClick={openAdd} style={{ ...userStatCard, borderStyle: 'dashed', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: theme.subText, cursor: 'pointer', minHeight: '160px', gap: '10px', transition: '0.2s' }}>
            <div style={{ fontSize: '28px' }}>+</div>
            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>{t('addNewAddress')}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- FAVORITES TAB ---
function FavoritesTab({ showToast, navigate }) {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('userFavorites') || '[]'); } catch { return []; }
  });
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/api/products')
      .then(r => r.json())
      .then(d => setAllProducts(Array.isArray(d) ? d : []))
      .catch((err) => {
        addLog('ERROR', { type: "FAVORITES_FETCH_FAIL", message: err.message });
      });
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      const favProducts = allProducts.filter(p => favorites.includes(p.id));
      setProducts(favProducts);
    }
  }, [favorites, allProducts]);

  const removeFromFavorites = (productId) => {
    const updated = favorites.filter(id => id !== productId);
    localStorage.setItem('userFavorites', JSON.stringify(updated));
    setFavorites(updated);
    showToast('Removed from favorites.', 'success');
  };

  const addToFavorites = (productId) => {
    if (favorites.includes(productId)) {
      showToast('Already in favorites.', 'error');
      return;
    }
    const updated = [...favorites, productId];
    localStorage.setItem('userFavorites', JSON.stringify(updated));
    setFavorites(updated);
    showToast('Added to favorites!', 'success');
  };

  const filteredAll = allProducts.filter(p =>
    !favorites.includes(p.id) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {showPicker && (
        <div onClick={e => { if (e.target === e.currentTarget) setShowPicker(false); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderTop: `3px solid ${theme.accent}`, borderRadius: '12px', padding: '30px', width: '500px', maxWidth: '95vw', maxHeight: '80vh', display: 'flex', flexDirection: 'column', scrollbarWidth: 'none' }}>
            <style>{`::-webkit-scrollbar { display: none; }`}</style>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontWeight: 900, fontSize: '15px', color: theme.text }}>ADD TO FAVORITES</div>
              <button onClick={() => setShowPicker(false)} style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.subText, width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <input
              style={{ ...fbInput, marginBottom: '15px' }}
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div style={{ overflowY: 'auto', flex: 1, scrollbarWidth: 'none' }}>
              {filteredAll.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: theme.subText, fontWeight: 800 }}>No products found</div>
              ) : filteredAll.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: theme.text }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: theme.accent, fontWeight: 900, marginTop: '3px' }}>{p.price} ₺</div>
                  </div>
                  <button onClick={() => addToFavorites(p.id)} style={{ padding: '8px 16px', background: 'rgba(59,130,246,0.1)', border: `1px solid ${theme.accent}`, color: theme.accent, borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 800 }}>+ ADD</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '25px' }}>
        <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '3px', marginBottom: '6px' }}>FAVORITES MODULE</div>
        <h3 style={{ margin: 0, fontSize: '20px', color: theme.text }}>My Favorites</h3>
      </div>

      {products.length === 0 ? (
        <div style={{ ...userMainCard, textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>🔖</div>
          <div style={{ fontWeight: 900, color: theme.subText, letterSpacing: '2px', marginBottom: '20px' }}>NO FAVORITES YET</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {products.map(p => (
            <div key={p.id} style={{ ...userStatCard, position: 'relative', overflow: 'hidden' }}>
              {p.image && (
                <div style={{ height: '140px', background: theme.cardBgLight, borderRadius: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={`http://localhost:8001/storage/${p.image}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt={p.name} />                </div>
              )}
              <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '5px', color: theme.text }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: theme.subText, marginBottom: '12px' }}>{p.brand || 'COMPATIBLE'}</div>
              <div style={{ fontSize: '20px', fontWeight: 900, color: theme.accent, marginBottom: '15px' }}>{p.price} ₺</div>
              <button onClick={() => removeFromFavorites(p.id)} style={{ width: '100%', padding: '10px', background: 'rgba(239,68,68,0.08)', border: `1px solid rgba(239,68,68,0.3)`, color: theme.danger, borderRadius: '8px', cursor: 'pointer', fontWeight: 800, fontSize: '12px' }}>
                {t('removeFromFavorites')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}





// --- USER FEEDBACK COMPONENT ---
function UserFeedback({ showToast, userName }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ subject: '', category: 'general', message: '', rating: 0 });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const categories = [
    { value: 'general',  label: t('catGeneral'),      icon: '💬' },
    { value: 'bug',      label: t('catBugReport'),   icon: '🐛' },
    { value: 'feature',  label: t('catSuggestion'),   icon: '✨' },
    { value: 'support',  label: t('catSupport'),      icon: '🛠️' },
  ];

  const handleSubmit = async () => {
    if (!form.subject.trim() || !form.message.trim()) {
      showToast(t('subjectRequired'), 'error');
      return;
    }
    if (form.rating === 0) {
      showToast(t('selectRating'), 'error');
      return;
    }

    setSending(true);
    const stars = '⭐'.repeat(form.rating) + '☆'.repeat(5 - form.rating);
    const catObj = categories.find(c => c.value === form.category);
    const payload = {
      user: userName || 'UNKNOWN_OPERATOR',
      category: `${catObj?.icon || ''} ${catObj?.label || form.category}`,
      rating: `${stars} (${form.rating}/5)`,
      subject: form.subject,
      message: form.message,
    };

    try {
      addLog('FEEDBACK', payload);
      setSent(true);
      showToast(t('feedbackTransmitted'), 'success');
      setForm({ subject: '', category: 'general', message: '', rating: 0 });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      addLog('ERROR', { type: 'FEEDBACK_SUBMIT_ERROR', message: err?.message || 'Unknown error' });
      showToast('Connection error.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', padding: '0 10px' }}>
      <div style={{ marginBottom: '10px' }}> 
        <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '2px', marginBottom: '2px' }}>{t('submitFeedback')}</div>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: theme.text }}>{t('sendFeedbackTitle')}</h2> 
        <p style={{ color: theme.subText, fontSize: '11px', marginTop: '2px', lineHeight: 1.3 }}> 
          {t('sendFeedbackSub')}
        </p>
      </div>

      {sent && (
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: `1px solid rgba(16, 185, 129, 0.3)`, borderRadius: '12px', padding: '20px 25px', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '22px' }}>✅</span>
          <div>
            <div style={{ fontWeight: 900, color: theme.success, fontSize: '13px' }}>{t('feedbackReceived')}</div>
            <div style={{ color: theme.subText, fontSize: '12px', marginTop: '3px' }}>{t('feedbackRecordedMsg')}</div>
          </div>
        </div>
      )}

      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '35px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
        <div>
          <div style={fbLabel}>{t('categoryLabel')}</div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setForm({ ...form, category: cat.value })}
                style={{
                  padding: '10px 18px', borderRadius: '10px', border: `1px solid ${form.category === cat.value ? theme.accent : theme.border}`,
                  background: form.category === cat.value ? 'rgba(59,130,246,0.12)' : 'transparent',
                  color: form.category === cat.value ? '#fff' : theme.subText,
                  cursor: 'pointer', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', transition: '0.2s'
                }}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={fbLabel}>{t('experienceRating')}</div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {[1,2,3,4,5].map(star => (
              <span
                key={star}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setForm({ ...form, rating: star })}
                style={{
                  fontSize: '28px', cursor: 'pointer', transition: '0.15s',
                  filter: (hoveredStar || form.rating) >= star ? 'none' : 'grayscale(1) opacity(0.3)',
                  transform: (hoveredStar || form.rating) >= star ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                ⭐
              </span>
            ))}
            {form.rating > 0 && (
              <span style={{ fontSize: '12px', color: theme.subText, alignSelf: 'center', marginLeft: '8px', fontWeight: 800 }}>
                {['', t('ratingTerrible'), t('ratingBad'), t('ratingAverage'), t('ratingGood'), t('ratingExcellent')][form.rating]}
              </span>
            )}
          </div>
        </div>

        <div>
          <div style={fbLabel}>{t('subjectLabel')}</div>
          <input
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            {...{placeholder: t('subjectPlaceholder')}}
            style={{ ...fbInput, width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <div style={fbLabel}>{t('messageLabel')}</div>
          <textarea
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            {...{placeholder: t('messagePlaceholder')}}
            rows={5}
            style={{ ...fbInput, width: '100%', boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={sending}
          style={{
            padding: '15px 30px', background: sending ? 'rgba(59,130,246,0.4)' : theme.accent,
            color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: sending ? 'not-allowed' : 'pointer',
            fontSize: '13px', letterSpacing: '1.5px', boxShadow: sending ? 'none' : `0 4px 20px ${theme.accentGlow}`,
            transition: '0.2s', alignSelf: 'center'
          }}
        >
          {sending ? t('transmitting') : `📡 ${t('submitFeedback')}`}
        </button>
      </div>
    </div>
  );
}








const fbLabel = { fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '1.5px', marginBottom: '12px' };
const fbInput = { background: 'rgba(0,0,0,0.3)', border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '14px 16px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: '"Inter", sans-serif' };

// ── LANGUAGE SELECTOR CARD (used inside SystemHomeTab) ──
function LanguageSelectorCard() {
  const { lang, setLang } = useTranslation();
  const langMeta = {
    en: { flag: '🇬🇧', name: 'English',  sub: 'English'  },
    fr: { flag: '🇫🇷', name: 'Français', sub: 'French'   },
    de: { flag: '🇩🇪', name: 'Deutsch',  sub: 'German'   },
    tr: { flag: '🇹🇷', name: 'Türkçe',   sub: 'Turkish'  },
  };
  return (
    <div style={{ gridColumn: 'span 4', background: theme.card, border: `1px solid ${theme.border}`, padding: '24px', borderRadius: '14px' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(59,130,246,0.15)', border: `1px solid rgba(59,130,246,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🌐</div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: theme.text }}>INTERFACE LANGUAGE</div>
          <div style={{ fontSize: '9px', color: theme.subText, fontWeight: 700, letterSpacing: '1px', marginTop: '2px' }}>SELECT SYSTEM LOCALE</div>
        </div>
        <div style={{ marginLeft: 'auto', padding: '3px 10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '20px', fontSize: '9px', color: theme.success, fontWeight: 800, letterSpacing: '1px' }}>
          ACTIVE: {langMeta[lang]?.name.toUpperCase()}
        </div>
      </div>

      {/* Language option tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {LANG_OPTIONS.map(opt => {
          const isActive = lang === opt.code;
          const meta = langMeta[opt.code];
          return (
            <button
              key={opt.code}
              onClick={() => setLang(opt.code)}
              style={{
                padding: '16px 14px',
                background: isActive ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? 'rgba(59,130,246,0.45)' : theme.border}`,
                borderBottom: `3px solid ${isActive ? theme.accent : 'transparent'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.18s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(59,130,246,0.06)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = theme.border; } }}
            >
              {isActive && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />}
              <span style={{ fontSize: '26px', lineHeight: 1, flexShrink: 0 }}>{meta.flag}</span>
              <div style={{ textAlign: 'left', minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 900, color: isActive ? theme.accent : theme.text, letterSpacing: '0.5px' }}>{meta.name}</div>
                <div style={{ fontSize: '9px', color: theme.subText, fontWeight: 700, letterSpacing: '1px', marginTop: '2px' }}>{meta.sub.toUpperCase()}</div>
              </div>
              {isActive && (
                <div style={{ marginLeft: 'auto', width: '18px', height: '18px', borderRadius: '50%', background: theme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', flexShrink: 0 }}>✓</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- SYSTEM HOME TAB (REAL PERFORMANCE DATA) ---
function SystemHomeTab({ userName, navigate }) {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState({ latency: null, uptime: navigator.onLine ? 99.9 : 0, nodes: 3, jsHeapUsed: null, jsHeapTotal: null, connection: null, memory: null });
  const [healthBars, setHealthBars] = useState({ cpu: 0, memory: 0, network: 0, storage: 0 });

  useEffect(() => {
    // Measure real network latency with fetch timing
    const measureLatency = async () => {
      try {
        const t0 = performance.now();
        await fetch('http://localhost:8001/api/products', { method: 'HEAD', cache: 'no-store' }).catch(() => {});
        const latency = Math.round(performance.now() - t0);
        setMetrics(m => ({ ...m, latency }));
      } catch { setMetrics(m => ({ ...m, latency: null })); }
    };

    // Real memory usage via performance.memory (Chrome only)
    const updateMemory = () => {
      if (performance.memory) {
        const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
        const total = Math.round(performance.memory.totalJSHeapSize / 1048576);
        const pct = Math.min(Math.round((used / total) * 100), 100);
        setMetrics(m => ({ ...m, jsHeapUsed: used, jsHeapTotal: total, memory: pct }));
        setHealthBars(h => ({ ...h, memory: pct }));
      }
      // Navigator connection info
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        const downlink = conn.downlink || 10;
        const networkPct = Math.min(Math.round((downlink / 100) * 100), 95);
        setMetrics(m => ({ ...m, connection: `${downlink} Mbps` }));
        setHealthBars(h => ({ ...h, network: networkPct }));
      } else {
        setHealthBars(h => ({ ...h, network: navigator.onLine ? 72 : 0 }));
      }
      // Simulate CPU and storage from timing APIs
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        const loadTime = navEntries[0].loadEventEnd - navEntries[0].startTime;
        const cpuEst = Math.min(Math.round((loadTime / 5000) * 40) + 8, 80);
        setHealthBars(h => ({ ...h, cpu: cpuEst }));
      } else { setHealthBars(h => ({ ...h, cpu: 12 })); }
      // Storage estimate
      if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(est => {
          const pct = Math.round((est.usage / est.quota) * 100) || 5;
          setHealthBars(h => ({ ...h, storage: pct }));
        });
      } else { setHealthBars(h => ({ ...h, storage: 5 })); }
    };

    measureLatency();
    updateMemory();
    const interval = setInterval(() => { measureLatency(); updateMemory(); }, 5000);
    return () => clearInterval(interval);
  }, []);

  const latencyColor = metrics.latency == null ? theme.subText : metrics.latency < 50 ? theme.success : metrics.latency < 200 ? '#f59e0b' : theme.danger;
  const sessions = JSON.parse(localStorage.getItem('nexus_sessions') || '[]');
  const lastLogin = sessions.find(s => s.type === 'login');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      {/* Top stat cards */}
      {[
        { labelKey: 'networkLatency', val: metrics.latency != null ? `${metrics.latency}` : '...', unit: metrics.latency != null ? 'MS' : '', color: latencyColor, grad: 'rgba(59,130,246,0.1)' },
        { labelKey: 'activeNodes',    val: metrics.nodes, unit: '', color: theme.success, grad: 'rgba(16,185,129,0.1)' },
        { labelKey: 'uplinkStatus',   val: navigator.onLine ? t('online') : t('offline'), unit: '', color: navigator.onLine ? theme.success : theme.danger, grad: navigator.onLine ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)' },
        { labelKey: 'jsHeapUsed',     val: metrics.jsHeapUsed != null ? `${metrics.jsHeapUsed}` : 'N/A', unit: metrics.jsHeapUsed != null ? 'MB' : '', color: '#8b5cf6', grad: 'rgba(139,92,246,0.1)' },
      ].map((s, i) => (
        <div key={i} className="ud-stat-card" style={{ background: `linear-gradient(135deg, ${s.grad} 0%, rgba(13,13,16,0.8) 100%)`, border: `1px solid ${theme.border}`, borderLeft: `3px solid ${s.color}`, padding: '22px', borderRadius: '14px', position: 'relative', overflow: 'hidden', cursor: 'default' }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', borderRadius: '50%', background: s.grad, filter: 'blur(8px)' }} />
          <div style={{ fontSize: '9px', color: theme.subText, fontWeight: 800, letterSpacing: '1.5px', marginBottom: '10px' }}>{t(s.labelKey).toUpperCase()}</div>
          <div style={{ fontSize: '26px', fontWeight: 900, color: s.color }}>{s.val}<span style={{ fontSize: '13px', marginLeft: '2px' }}>{s.unit}</span></div>
          <div style={{ marginTop: '12px', height: '2px', background: theme.border, borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '70%', background: s.color, borderRadius: '2px', opacity: 0.6 }} />
          </div>
        </div>
      ))}

      {/* Welcome card */}
      <div style={{ gridColumn: 'span 3', background: 'linear-gradient(135deg, #0d0d14 0%, #111120 100%)', border: `1px solid ${theme.border}`, padding: '32px 40px', borderRadius: '18px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '40px' }}>
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', background: theme.accent, filter: 'blur(90px)', opacity: 0.12 }} />
        <div style={{ flexShrink: 0, width: '70px', height: '70px', borderRadius: '18px', background: `linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))`, border: `1px solid rgba(59,130,246,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', animation: 'udFloat 5s ease-in-out infinite' }}>⚡</div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '9px', color: theme.accent, fontWeight: 900, letterSpacing: '3px', marginBottom: '8px' }}>{t('systemStatus')}</div>
          <h2 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 8px 0', color: theme.text }}>{t('welcomeBack')}, {userName}.</h2>
          <p style={{ color: theme.subText, fontSize: '12px', lineHeight: '1.7', margin: '0 0 20px 0' }}>
            {lastLogin ? `Son giriş: ${new Date(lastLogin.time).toLocaleString('tr-TR')}` : 'Terminal synchronized with the Global Nexus Mesh.'}
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="ud-primary-btn" style={{ padding: '10px 20px', background: theme.accent, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '11px', letterSpacing: '1px', boxShadow: `0 4px 18px ${theme.accentGlow}`, transition: 'all 0.2s' }} onClick={() => navigate('/')}>{t('accessMarket')}</button>
          </div>
        </div>
      </div>

      {/* Uptime/Latency/Nodes live strip */}
      <div style={{ gridColumn: 'span 1', background: theme.card, border: `1px solid ${theme.border}`, padding: '20px', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ fontWeight: 900, fontSize: '11px', letterSpacing: '1.5px', color: theme.text, paddingBottom: '10px', borderBottom: `1px solid ${theme.border}` }}>{t('liveMetrics')}</div>
        {[
          { label: 'LATENCY', val: metrics.latency != null ? `${metrics.latency}ms` : 'measuring...', color: latencyColor },
          { label: 'UPTIME', val: `${metrics.uptime}%`, color: theme.success },
          { label: 'NODES', val: `0${metrics.nodes}`, color: '#8b5cf6' },
          { label: 'CONNECTION', val: metrics.connection || (navigator.onLine ? 'ONLINE' : 'OFFLINE'), color: navigator.onLine ? theme.success : theme.danger },
        ].map(m => (
          <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: '9px', color: theme.subText, fontWeight: 800, letterSpacing: '1px' }}>{m.label}</div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: m.color }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* System Health Matrix - real data */}
      <div style={{ gridColumn: 'span 4', background: theme.card, border: `1px solid ${theme.border}`, padding: '24px', borderRadius: '14px' }}>
        <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, letterSpacing: '2px', marginBottom: '20px' }}>{t('systemHealthMatrix')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            { labelKey: 'cpuEstimate', pct: healthBars.cpu, color: healthBars.cpu > 70 ? theme.danger : theme.success },
            { labelKey: 'jsMemory',    pct: healthBars.memory || 30, color: theme.accent },
            { labelKey: 'network',     pct: healthBars.network || 60, color: '#8b5cf6' },
            { labelKey: 'storage',     pct: healthBars.storage || 5, color: '#f59e0b' },
          ].map(h => (
            <div key={h.labelKey}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '9px', color: theme.subText, fontWeight: 800, letterSpacing: '1px' }}>{t(h.labelKey).toUpperCase()}</div>
                <div style={{ fontSize: '9px', color: h.color, fontWeight: 900 }}>{h.pct}%</div>
              </div>
              <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${h.pct}%`, background: h.color, borderRadius: '4px', boxShadow: `0 0 8px ${h.color}`, transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LANGUAGE SELECTOR CARD ── */}
      <LanguageSelectorCard />
    </div>
  );
}

// --- SECURITY TAB ---
function SecurityTab({ showToast, userName, userId, userEmail }) {
  const { t } = useTranslation();
  const token = localStorage.getItem('token');
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [emailForm, setEmailForm] = useState({ newEmail: '' });
  const [avatar, setAvatar] = useState(() => localStorage.getItem('userAvatar') || null);
  const [saving, setSaving] = useState('');
  const fileRef = useRef(null);

  const lastLogin = (() => {
    try {
      const sessions = JSON.parse(localStorage.getItem('nexus_sessions') || '[]');
      return sessions.find(s => s.type === 'login' || !s.type);
    } catch { return null; }
  })();

  const handlePasswordChange = async () => {
    if (!pwForm.current || !pwForm.newPw) return showToast(t('fillAllFields'), 'error');
    if (pwForm.newPw !== pwForm.confirm) return showToast(t('passwordsNoMatch'), 'error');
    if (pwForm.newPw.length < 6) return showToast(t('passwordTooShort'), 'error');
    setSaving('pw');
    try {
      const res = await fetch('http://localhost:8001/api/user/password', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ current_password: pwForm.current, password: pwForm.newPw, password_confirmation: pwForm.confirm })
      });
      if (res.ok) {
        addLog('AUDIT', { user: userName, action: 'PASSWORD_CHANGED', source: 'USER' });
        showToast(t('passwordChanged'), 'success');
        setPwForm({ current: '', newPw: '', confirm: '' });
      } else {
        const d = await res.json();
        showToast(d.message || t('passwordTooShort'), 'error');
      }
    } catch { showToast(t('connectionError'), 'error'); }
    finally { setSaving(''); }
  };

  const handleEmailChange = async () => {
    if (!emailForm.newEmail || !emailForm.newEmail.includes('@')) return showToast(t('validEmail'), 'error');
    setSaving('email');
    try {
      const res = await fetch('http://localhost:8001/api/user/email', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: emailForm.newEmail })
      });
      if (res.ok) {
        addLog('AUDIT', { user: userName, action: 'EMAIL_CHANGED', source: 'USER' });
        showToast(t('emailUpdateSent'), 'success');
        setEmailForm({ newEmail: '' });
      } else {
        const d = await res.json();
        showToast(d.message || 'Email could not be updated', 'error');
      }
    } catch { showToast(t('connectionError'), 'error'); }
    finally { setSaving(''); }
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return showToast('Max 2MB', 'error');
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setAvatar(base64);
      localStorage.setItem('userAvatar', base64);
      showToast(t('profilePhotoUpdated'), 'success');
    };
    reader.readAsDataURL(file);
  };

  const initials = userName ? userName[0].toUpperCase() : '?';
  const displayEmail = userEmail || localStorage.getItem('userEmail') || '';
  const role = localStorage.getItem('userRole') || 'user';

  // Shared input style
  const secInput = {
    width: '100%',
    padding: '12px 16px',
    background: '#08090a',
    border: '1px solid #1f222b',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };

  const secLabel = {
    display: 'block',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '10px',
    color: theme.accent,
    letterSpacing: '2px',
    fontWeight: 800,
    marginBottom: '8px',
    textTransform: 'uppercase',
  };

  const secCard = {
    background: '#0d0f14',
    border: '1px solid #1f222b',
    borderRadius: '16px',
    padding: '28px',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap');
        .sec-input:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.15) !important; }
        .sec-input-green:focus { border-color: #10b981 !important; box-shadow: 0 0 0 3px rgba(16,185,129,0.15) !important; }
        .sec-btn-blue:hover { background: #2563eb !important; transform: translateY(-1px); }
        .sec-btn-green:hover { background: #059669 !important; transform: translateY(-1px); }
        .sec-upload-btn:hover { background: #2563eb !important; transform: translateY(-1px); }
      `}</style>

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', color: theme.accent, fontSize: '11px', letterSpacing: '3px', fontWeight: 800, marginBottom: '10px' }}>{t('securityModule')}</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>{t('securityTitle')}</h1>
        <p style={{ color: '#8b92a5', fontSize: '14px' }}>{t('securitySubtitle')}</p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', marginBottom: '24px' }}>

        {/* Left: Profile Card */}
        <div style={{ ...secCard, borderTop: '1px solid #3b82f6', boxShadow: '0 -15px 30px -20px rgba(59,130,246,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Avatar */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem', fontWeight: 700, color: '#fff',
              boxShadow: '0 0 25px rgba(59,130,246,0.4)',
              border: '4px solid #0d0f14', overflow: 'hidden'
            }}>
              {avatar ? <img src={avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="avatar" /> : initials}
            </div>
            <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '18px', height: '18px', background: '#10b981', borderRadius: '50%', border: '3px solid #0d0f14' }} />
          </div>

          <div style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '1px', marginBottom: '4px' }}>{userName?.toUpperCase()}</div>
          <div style={{ color: '#8b92a5', fontSize: '13px', marginBottom: '20px' }}>{displayEmail}</div>

          <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(16,185,129,0.2)', marginBottom: '30px' }}>
            <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', animation: 'udPulse 2s infinite' }} />
            {t('activeSession')}
          </div>

          {/* Upload */}
          <div style={{ marginTop: 'auto', width: '100%' }}>
            <div style={{ fontSize: '11px', color: '#8b92a5', marginBottom: '10px' }}>{t('uploadPhotoHint')}</div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatar} />
            <button
              className="sec-upload-btn"
              onClick={() => fileRef.current?.click()}
              style={{ width: '100%', padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              {t('uploadPhoto')}
            </button>
          </div>
        </div>

        {/* Right: Settings Forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Password Card */}
          <div style={{ ...secCard, borderTop: '1px solid #3b82f6', boxShadow: '0 -15px 30px -20px rgba(59,130,246,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#08090a', border: '1px solid #1f222b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
              </div>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>{t('changePassword')}</h2>
                <p style={{ color: '#8b92a5', fontSize: '13px' }}>{t('changePasswordSub')}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
              {[
                { labelKey: t('currentPassword'), val: pwForm.current, key: 'current' },
                { labelKey: t('newPassword'), val: pwForm.newPw, key: 'newPw' },
                { labelKey: t('confirmPassword'), val: pwForm.confirm, key: 'confirm' },
              ].map(field => (
                <div key={field.key}>
                  <label style={secLabel}>{field.labelKey}</label>
                  <input
                    className="sec-input"
                    type="password"
                    placeholder="••••••••"
                    value={field.val}
                    onChange={e => setPwForm({ ...pwForm, [field.key]: e.target.value })}
                    style={secInput}
                  />
                </div>
              ))}
            </div>

            <button
              className="sec-btn-blue"
              onClick={handlePasswordChange}
              disabled={saving === 'pw'}
              style={{ padding: '12px 28px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
              {saving === 'pw' ? t('updatingPassword') : t('updatePassword')}
            </button>
          </div>

          {/* Email Card */}
          <div style={{ ...secCard, borderTop: '1px solid #10b981', boxShadow: '0 -15px 30px -20px rgba(16,185,129,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#08090a', border: '1px solid #1f222b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>{t('changeEmail')}</h2>
                <p style={{ color: '#8b92a5', fontSize: '13px' }}>{t('currentLabel')} <span style={{ color: '#fff', fontWeight: 600 }}>{displayEmail}</span></p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label style={{ ...secLabel, color: '#10b981' }}>{t('newEmailAddress')}</label>
                <input
                  className="sec-input-green"
                  type="email"
                  placeholder="new@email.com"
                  value={emailForm.newEmail}
                  onChange={e => setEmailForm({ newEmail: e.target.value })}
                  style={{ ...secInput, borderColor: '#1f222b' }}
                />
              </div>
              <button
                className="sec-btn-green"
                onClick={handleEmailChange}
                disabled={saving === 'email'}
                style={{ padding: '12px 24px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(16,185,129,0.3)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {saving === 'email' ? t('updatingEmail') : t('updateEmail')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          {
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
            iconColor: '#a78bfa',
            label: t('userIdLabel'),
            value: userId || '—',
          },
          {
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
            iconColor: '#60a5fa',
            label: t('lastLoginLabel'),
            value: lastLogin ? new Date(lastLogin.time).toLocaleString('tr-TR') : '—',
          },
          {
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
            iconColor: '#38bdf8',
            label: t('accountRoleLabel'),
            value: role.toUpperCase(),
          },
        ].map((item, i) => (
          <div key={i} style={{ ...secCard, display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#08090a', border: '1px solid #1f222b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.iconColor, flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8b92a5', letterSpacing: '1px', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', color: '#fff' }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityTab({ userName }) {
  const { t } = useTranslation();
  const sessions = JSON.parse(localStorage.getItem('nexus_sessions') || '[]');
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '3px', marginBottom: '6px' }}>{t('activityModule')}</div>
      <h3 style={{ margin: '0 0 24px 0', fontSize: '20px', color: theme.text }}>{t('accountActivityTitle')}</h3>
      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, letterSpacing: '2px' }}>{t('loginLogoutHistory')}</div>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: theme.success, animation: 'udPulse 2s infinite' }} />
        </div>
        {sessions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: theme.subText, fontSize: '13px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
            {t('noSessionHistory')}
          </div>
        ) : (
          <div style={{ maxHeight: '500px', overflowY: 'auto', scrollbarWidth: 'none' }}>
            {sessions.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', borderBottom: `1px solid ${theme.border}`, transition: '0.15s' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: s.type === 'login' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${s.type === 'login' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>
                  {s.type === 'login' ? '🔓' : '🔒'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: theme.text }}>{s.type === 'login' ? t('sessionOpened') : t('sessionClosed')}</div>
                  <div style={{ fontSize: '11px', color: theme.subText, marginTop: '2px' }}>{s.user}</div>
                </div>
                <div style={{ fontSize: '11px', color: theme.subText, textAlign: 'right' }}>
                  <div>{new Date(s.time).toLocaleDateString('tr-TR')}</div>
                  <div style={{ color: s.type === 'login' ? theme.success : theme.danger, fontWeight: 800 }}>{new Date(s.time).toLocaleTimeString('tr-TR')}</div>
                </div>
                <span style={{ fontSize: '9px', fontWeight: 900, padding: '3px 8px', borderRadius: '10px', background: s.type === 'login' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: s.type === 'login' ? theme.success : theme.danger, border: `1px solid ${s.type === 'login' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, letterSpacing: '1px', flexShrink: 0 }}>
                  {s.type === 'login' ? 'LOGIN' : 'LOGOUT'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- APPLY TAB ---
function ApplyTab({ showToast, userName, userEmail, userId }) {
  const [form, setForm] = useState({ reason: '', experience: '', plan: '' });
  const [submitted, setSubmitted] = useState(false);

  const existingApp = JSON.parse(localStorage.getItem('nexus_applications') || '[]').find(a => a.userName === userName);

  const handleSubmit = () => {
    if (!form.reason.trim() || !form.experience.trim() || !form.plan.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    const apps = JSON.parse(localStorage.getItem('nexus_applications') || '[]');
    if (apps.find(a => a.userName === userName && a.status === 'pending')) {
      showToast('You already have a pending application', 'error');
      return;
    }
    const newApp = {
      id: Date.now(),
      userId: userId || localStorage.getItem('userId'),
      userName,
      userEmail: userEmail || localStorage.getItem('userEmail') || '',
      reason: form.reason,
      experience: form.experience,
      plan: form.plan,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    apps.unshift(newApp);
    localStorage.setItem('nexus_applications', JSON.stringify(apps));
    window.dispatchEvent(new CustomEvent('nexus-log-update'));
    // Diğer sekmelere (admin paneli) bildir
    try {
      const bc = new BroadcastChannel('nexus_channel');
      bc.postMessage({ type: 'NEW_APPLICATION' });
      bc.close();
    } catch (_) {}
    addLog('AUDIT', { user: userName, action: 'ADMIN_APPLICATION_SUBMITTED', source: 'USER' });
    showToast('Application submitted!', 'success');
    setSubmitted(true);
    setForm({ reason: '', experience: '', plan: '' });
  };

  const inp = { ...fbInput, width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '3px', marginBottom: '6px' }}>APPLICATION MODULE</div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: theme.text }}>Admin Application</h3>
      <p style={{ color: theme.subText, fontSize: '12px', marginBottom: '24px', lineHeight: 1.6 }}>Fill out the application form to become an admin. Admins will review your request.</p>

      {existingApp && (
        <div style={{ background: existingApp.status === 'approved' ? 'rgba(16,185,129,0.08)' : existingApp.status === 'rejected' ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.08)', border: `1px solid ${existingApp.status === 'approved' ? 'rgba(16,185,129,0.3)' : existingApp.status === 'rejected' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`, borderRadius: '12px', padding: '22px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '8px' }}>
          <span style={{ fontSize: '28px' }}>{existingApp.status === 'approved' ? '✅' : existingApp.status === 'rejected' ? '❌' : '⏳'}</span>
          <div style={{ fontWeight: 900, fontSize: '13px', color: existingApp.status === 'approved' ? theme.success : existingApp.status === 'rejected' ? theme.danger : '#f59e0b' }}>
            {existingApp.status === 'approved' ? 'APPLICATION APPROVED' : existingApp.status === 'rejected' ? 'APPLICATION REJECTED' : 'APPLICATION PENDING'}
          </div>
          <div style={{ color: theme.subText, fontSize: '11px' }}>
            Submitted on {new Date(existingApp.createdAt).toLocaleString('en-US')}
          </div>
        </div>
      )}



      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '14px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div><div style={fbLabel}>WHY DO YOU WANT TO BE ADMIN? *</div><textarea style={{ ...inp, resize: 'none', lineHeight: 1.6 }} rows={3} placeholder="Explain your reason..." value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} /></div>
        <div><div style={fbLabel}>WHAT IS YOUR EXPERIENCE? *</div><textarea style={{ ...inp, resize: 'none', lineHeight: 1.6 }} rows={3} placeholder="Describe your management or moderation experience..." value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} /></div>
        <div><div style={fbLabel}>WHAT WILL YOU DO AS ADMIN? *</div><textarea style={{ ...inp, resize: 'none', lineHeight: 1.6 }} rows={3} placeholder="Explain your planned contributions..." value={form.plan} onChange={e => setForm({...form, plan: e.target.value})} /></div>
        <button onClick={handleSubmit} style={{ padding: '14px', background: theme.accent, color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '12px', letterSpacing: '1px', boxShadow: `0 4px 20px ${theme.accentGlow}` }}>
          📝 SUBMIT APPLICATION
        </button>
      </div>
    </div>
  );
}

// --- AUTH PAGE ---
function AuthPage({ showToast }) {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const navigate = useNavigate();

  useEffect(() => { document.title = 'NEXUS'; }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isLogin ? 'login' : 'register';
    const body = isLogin 
      ? { email: formData.email, password: formData.password } 
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:8001/api/${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(body)
      });

      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email || '');
          localStorage.setItem('userId', String(data.user.id || ''));
          localStorage.setItem('userRole', data.user.role || 'user'); 
          
          addLog('AUDIT', { user: data.user.name, action: isLogin ? "LOGIN_SUCCESS" : "REGISTER_SUCCESS", source: 'AUTH' });
          showToast(isLogin ? "Authorized" : "Identity Created", "success");
          navigate('/dashboard');
        } else {
          const errorMsg = data.errors ? Object.values(data.errors).flat()[0] : (data.message || "Credential Mismatch");
          showToast(errorMsg);
          addLog('ERROR', { type: "AUTH_DENIED", message: errorMsg, status: response.status });
        }
      } else {
        showToast(`CORE FAILURE: API ${endpoint.toUpperCase()} RETURNED HTML`);
      }
    } catch (err) {
      showToast("Critical connection failure");
    } finally {
      setLoading(false);
    }
  }

  // Floating particle positions (static so no re-render flicker)
  const particles = [
    { top: '15%', left: '8%', size: 2, opacity: 0.4 },
    { top: '72%', left: '5%', size: 3, opacity: 0.25 },
    { top: '40%', left: '12%', size: 1.5, opacity: 0.5 },
    { top: '88%', left: '20%', size: 2, opacity: 0.3 },
    { top: '25%', left: '88%', size: 3, opacity: 0.3 },
    { top: '60%', left: '92%', size: 2, opacity: 0.45 },
    { top: '10%', left: '75%', size: 1.5, opacity: 0.35 },
    { top: '80%', left: '82%', size: 2.5, opacity: 0.2 },
    { top: '50%', left: '3%', size: 1, opacity: 0.6 },
    { top: '35%', left: '95%', size: 1, opacity: 0.5 },
  ];

  return (
    <div style={{ ...authContainer, overflow: 'hidden' }}>
      <style>{`
        @keyframes authFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes authPulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }
        @keyframes authScan { 0% { top: -2px; } 100% { top: 100%; } }
        @keyframes authGlow { 0%,100% { box-shadow: 0 0 20px rgba(59,130,246,0.2); } 50% { box-shadow: 0 0 40px rgba(59,130,246,0.5), 0 0 80px rgba(59,130,246,0.2); } }
        @keyframes authFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes particleDrift { 0%,100% { transform: translateY(0) rotate(0deg); opacity: 0.4; } 33% { transform: translateY(-15px) rotate(120deg); opacity: 0.8; } 66% { transform: translateY(8px) rotate(240deg); opacity: 0.3; } }
        .auth-input:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 2px rgba(59,130,246,0.15), 0 0 20px rgba(59,130,246,0.1) !important; outline: none !important; }
        .auth-btn-main:hover { background: #2563eb !important; transform: translateY(-1px); box-shadow: 0 8px 25px rgba(59,130,246,0.4) !important; }
        .auth-btn-main:active { transform: translateY(0); }
        .auth-home-btn:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.2) !important; color: #fff !important; }
        .auth-toggle:hover { color: #3b82f6 !important; }
      `}</style>

      {/* Animated grid background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

      {/* Scan line animation */}
      <div style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)', animation: 'authScan 6s linear infinite', zIndex: 1 }} />

      {/* Large glow orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', animation: 'authFloat 7s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(30px)', animation: 'authFloat 9s ease-in-out infinite reverse' }} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div key={i} style={{ position: 'absolute', top: p.top, left: p.left, width: `${p.size}px`, height: `${p.size}px`, background: theme.accent, borderRadius: '50%', opacity: p.opacity, animation: `particleDrift ${5 + i * 0.7}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />
      ))}

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: `1px solid rgba(59,130,246,0.4)`, borderLeft: `1px solid rgba(59,130,246,0.4)` }} />
      <div style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', borderTop: `1px solid rgba(59,130,246,0.4)`, borderRight: `1px solid rgba(59,130,246,0.4)` }} />
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '40px', height: '40px', borderBottom: `1px solid rgba(59,130,246,0.4)`, borderLeft: `1px solid rgba(59,130,246,0.4)` }} />
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: `1px solid rgba(59,130,246,0.4)`, borderRight: `1px solid rgba(59,130,246,0.4)` }} />

      {/* System status bar top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}`, zIndex: 10 }}>
        <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 700, letterSpacing: '2px' }}>NEXUS_OS // AUTH_MODULE</div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {['SYS', 'NET', 'SEC'].map((label, i) => (
            <div key={label} style={{ fontSize: '9px', color: theme.accent, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: theme.accent, animation: `authPulse ${2 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }} />
              {label}: ACTIVE
            </div>
          ))}
        </div>
      </div>

      {/* Main card */
      <div style={{ ...authCard, animation: 'authFadeIn 0.5s ease-out', position: 'relative', zIndex: 10, animation: 'authGlow 4s ease-in-out infinite' }}>
        {/* Card scan line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`, opacity: 0.6 }} />

        {/* Header */}
        <div style={cardHeader}>
          <div style={{ ...logoBox, animation: 'authGlow 3s ease-in-out infinite' }}>N</div>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <h2 style={systemTitle}>{isLogin ? t('operatorAccess') : t('registerAccess')}</h2>
            <div style={statusLine}><span style={{ ...blinkDot, animation: 'authPulse 2s ease-in-out infinite' }}></span> {t('systemOnline')}</div>
          </div>
          {/* Home button */}
          <button
            className="auth-home-btn"
            onClick={() => navigate('/')}
            style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${theme.border}`, color: theme.subText, borderRadius: '6px', cursor: 'pointer', fontSize: '10px', fontWeight: 800, letterSpacing: '1px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← HOME
          </button>
        </div>

        {/* Divider with text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: theme.border }} />
          <div style={{ fontSize: '9px', color: theme.subText, fontWeight: 700, letterSpacing: '2px' }}>SECURE_CHANNEL</div>
          <div style={{ flex: 1, height: '1px', background: theme.border }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {!isLogin && (
            <div>
              <label style={labelStyle}>{t('codename')}</label>
              <input
                className="auth-input"
                value={formData.name}
                placeholder={t('codename_placeholder')}
                style={{ ...techInput, transition: 'all 0.2s' }}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}
          <div>
            <label style={labelStyle}>{t('accessId')}</label>
            <input
              className="auth-input"
              type="email"
              value={formData.email}
              placeholder={t('accessId_placeholder')}
              style={{ ...techInput, transition: 'all 0.2s' }}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>{t('securityKey')}</label>
            <input
              className="auth-input"
              type="password"
              value={formData.password}
              placeholder={t('securityKey_placeholder')}
              style={{ ...techInput, transition: 'all 0.2s' }}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            className="auth-btn-main"
            style={{ ...accessBtn, transition: 'all 0.2s', position: 'relative', overflow: 'hidden', letterSpacing: '2px', boxShadow: `0 4px 20px ${theme.accentGlow}` }}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span style={{ width: '12px', height: '12px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'authScan 0.7s linear infinite' }} />
                AUTHENTICATING...
              </span>
            ) : (isLogin ? t('initSession') : t('registerAccess'))}
          </button>
        </form>

        {/* Bottom section */}
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'center' }}>
          <button
            className="auth-toggle"
            onClick={() => setIsLogin(!isLogin)}
            style={{ ...toggleBtn, transition: 'color 0.2s', letterSpacing: '1px' }}
          >
            {isLogin ? t('noAccount') : t('haveAccount')}
          </button>
        </div>
      </div>

      /* Bottom status */}
      <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, textAlign: 'center', fontSize: '9px', color: theme.subText, opacity: 0.4, letterSpacing: '3px', fontWeight: 700 }}>
        NEXUS OS // QUANTUM-ENCRYPTED // V.4.0.2
      </div>
    </div>
  )
}

// --- CHECKOUT FLOW COMPONENT (FIXED) ---
function CheckoutFlow({ cart, showToast, navigate, onComplete }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('userAddresses') || '[]'); } catch { return []; }
  });
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(null);
  const [paymentForm, setPaymentForm] = useState({ cardName: '', cardNumber: '', expiryDate: '', cvv: '' });
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Format Card Number: 1234 5678 9012 3456
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const parts = cleaned.match(/.{1,4}/g) || [];
    return parts.join(' ');
  };

  // FORMAT EXPIRY DATE - MM/YY (bu fonksiyon düzeltildi)
  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Step 1: Address Selection
  if (step === 1) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', padding: '20px', overflow: 'hidden' }}>
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderTop: `3px solid ${theme.accent}`, borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '700px', height: '90vh', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
          <style>{`::-webkit-scrollbar { display: none; }`}</style>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: `1px solid ${theme.border}`, flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '2px', marginBottom: '6px' }}>{t('checkoutStep1')}</div>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: theme.text }}>{t('selectDelivery')}</h2>
            </div>
            <button onClick={() => navigate('/')} style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.subText, width: '40px', height: '40px', borderRadius: '8px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', marginBottom: '30px' }}>
            {addresses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌐</div>
                <div style={{ fontWeight: 900, fontSize: '18px', color: theme.text, marginBottom: '10px' }}>NO ADDRESSES FOUND</div>
                <p style={{ color: theme.subText, marginBottom: '25px' }}>You need to add an address before checkout.</p>
                <button onClick={() => navigate('/dashboard')} style={{ padding: '14px 30px', background: theme.accent, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '13px', boxShadow: `0 4px 15px ${theme.accentGlow}` }}>
                  → GO TO ADD ADDRESS
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {addresses.map((addr, i) => (
                  <div 
                    key={i}
                    onClick={() => setSelectedAddressIdx(i)}
                    style={{
                      background: selectedAddressIdx === i ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `2px solid ${selectedAddressIdx === i ? theme.accent : theme.border}`,
                      borderRadius: '12px',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: '0.2s',
                      position: 'relative'
                    }}
                  >
                    {selectedAddressIdx === i && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', background: theme.accent, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 900 }}>✓</div>
                    )}
                    <div style={{ fontSize: '12px', color: theme.accent, fontWeight: 900, letterSpacing: '1px', marginBottom: '8px' }}>{addr.title.toUpperCase()}</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '5px', color: theme.text }}>{addr.fullName}</div>
                    {addr.phone && <div style={{ fontSize: '12px', color: theme.subText, marginBottom: '3px' }}>{addr.phone}</div>}
                    <div style={{ fontSize: '12px', color: theme.subText }}>{addr.city}, {addr.district}</div>
                    <div style={{ fontSize: '11px', color: theme.subText, marginTop: '8px', lineHeight: 1.4 }}>{addr.address}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => navigate('/')} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}`, color: theme.text, borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '12px' }}>{t('cancel')}</button>
            <button 
              onClick={() => setStep(2)}
              disabled={selectedAddressIdx === null || addresses.length === 0}
              style={{
                flex: 1,
                padding: '12px',
                background: selectedAddressIdx !== null && addresses.length > 0 ? theme.accent : 'rgba(59,130,246,0.3)',
                border: 'none',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: 900,
                cursor: selectedAddressIdx !== null && addresses.length > 0 ? 'pointer' : 'not-allowed',
                fontSize: '12px'
              }}
            >
              {t('continueToPayment')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Payment
  if (step === 2) {
    const handlePayment = async () => {
      if (!paymentForm.cardName || !paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv) {
        showToast('All payment fields are required', 'error');
        return;
      }
      const cleanedCardNumber = paymentForm.cardNumber.replace(/\s/g, '');
      if (cleanedCardNumber.length !== 16) {
        showToast('Card number must be 16 digits', 'error');
        return;
      }
      if (paymentForm.cvv.length !== 3) {
        showToast('CVV must be 3 digits', 'error');
        return;
      }
    const expiryRegex = /^\d{2}\/\d{2}$/;
      if (!expiryRegex.test(formatExpiryDate(paymentForm.expiryDate))) {
      showToast('Expiry date format must be MM/YY (example: 12/25)', 'error');
      return;
    }
      setProcessing(true);

      try {
        const orderItems = cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }));

        const orderData = {
          items: orderItems,
          total: cartTotal.toFixed(2),
          address_id: selectedAddressIdx,
          status: 'pending'
        };

        const response = await fetch('http://localhost:8001/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify(orderData)
        });

        if (response.ok) {
          const orderResult = await response.json();
          setOrder(orderResult);
          localStorage.removeItem('cart');
          addLog('PRODUCT', { user: userName, action: 'ORDER_PLACED', total: cartTotal.toFixed(2), items: cart.length });
          setStep(3);
          showToast('Order created successfully!', 'success');
        } else {
          const errorData = await response.json();
          showToast(errorData.message || 'Order creation failed', 'error');
          addLog('ERROR', { type: 'ORDER_FAIL', status: response.status, message: errorData.message });
        }
      } catch (err) {
        showToast('Payment processing error: ' + err.message, 'error');
        addLog('ERROR', { type: 'PAYMENT_ERROR', message: err.message });
      } finally {
        setProcessing(false);
      }
    };

    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', padding: '20px', overflow: 'hidden' }}>
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderTop: `3px solid ${theme.accent}`, borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '700px', height: '90vh', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
          <style>{`::-webkit-scrollbar { display: none; }`}</style>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: `1px solid ${theme.border}`, flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '2px', marginBottom: '6px' }}>{t('checkoutStep2')}</div>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: theme.text }}>{t('paymentDetails')}</h2>
            </div>
            <button onClick={() => navigate('/')} style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.subText, width: '40px', height: '40px', borderRadius: '8px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
            {/* Selected Address Summary */}
            <div style={{ background: 'rgba(59,130,246,0.1)', border: `1px solid ${theme.accent}`, borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
              <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '1px', marginBottom: '10px' }}>{t('deliveryAddress')}</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: theme.text }}>{addresses[selectedAddressIdx]?.fullName}</div>
              <div style={{ fontSize: '12px', color: theme.subText, marginTop: '5px' }}>{addresses[selectedAddressIdx]?.city}, {addresses[selectedAddressIdx]?.district}</div>
            </div>

            {/* Payment Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={fbLabel}>{t('cardholderName')}</label>
                <input 
                  style={{ ...fbInput, width: '100%', boxSizing: 'border-box' }}
                  placeholder="John Doe"
                  value={paymentForm.cardName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                  maxLength="50"
                />
              </div>

              <div>
                <label style={fbLabel}>{t('cardNumber')}</label>
                <input 
                  style={{ ...fbInput, width: '100%', boxSizing: 'border-box', letterSpacing: '2px', fontFamily: 'monospace', fontSize: '16px' }}
                  placeholder="1234 5678 9012 3456"
                  value={formatCardNumber(paymentForm.cardNumber)}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value.replace(/\s/g, '') })}
                  maxLength="19"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={fbLabel}>{t('expiryDate')}</label>
                  <input 
                    style={{ ...fbInput, width: '100%', boxSizing: 'border-box', letterSpacing: '2px', fontFamily: 'monospace', fontSize: '16px' }}
                    placeholder="12/25"
                    value={formatExpiryDate(paymentForm.expiryDate)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setPaymentForm({ ...paymentForm, expiryDate: value });
                    }}
                    maxLength="5"
                  />
                </div>
                <div>
                  <label style={fbLabel}>{t('cvv')}</label>
                  <input 
                    style={{ ...fbInput, width: '100%', boxSizing: 'border-box', letterSpacing: '3px', fontFamily: 'monospace', fontSize: '16px' }}
                    placeholder="123"
                    type="password"
                    value={paymentForm.cvv}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                    maxLength="3"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
              <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '1px', marginBottom: '15px' }}>ORDER SUMMARY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px', maxHeight: '150px', overflowY: 'auto', scrollbarWidth: 'none' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme.subText }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span style={{ color: theme.accent, fontWeight: 900 }}>{(item.price * item.quantity).toFixed(2)} ₺</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 900, color: theme.text }}>TOTAL:</span>
                <span style={{ fontSize: '20px', fontWeight: 900, color: theme.accent }}>{cartTotal.toFixed(2)} ₺</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
            <button 
              onClick={() => setStep(1)}
              disabled={processing}
              style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}`, color: theme.text, borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '12px' }}
            >
              ← BACK
            </button>
            <button 
              onClick={handlePayment}
              disabled={processing}
              style={{
                flex: 1,
                padding: '12px',
                background: processing ? 'rgba(59,130,246,0.3)' : theme.accent,
                border: 'none',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: 900,
                cursor: processing ? 'not-allowed' : 'pointer',
                fontSize: '12px'
              }}
            >
              {processing ? t('processing') : t('confirmPayment')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Confirmation
  if (step === 3) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', padding: '20px', overflow: 'hidden' }}>
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderTop: `3px solid ${theme.success}`, borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '600px', textAlign: 'center', maxHeight: '90vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
          <style>{`::-webkit-scrollbar { display: none; }`}</style>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: 900, color: theme.text }}>{t('orderConfirmed')}</h2>
          <p style={{ color: theme.subText, fontSize: '14px', marginBottom: '30px' }}>{t('orderPlaced')}</p>

          <div style={{ background: 'rgba(16,185,129,0.1)', border: `1px solid ${theme.success}`, borderRadius: '12px', padding: '25px', marginBottom: '30px' }}>
            <div style={{ fontSize: '10px', color: theme.success, fontWeight: 900, letterSpacing: '1px', marginBottom: '8px' }}>{t('orderNumber')}</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: theme.accent }}>#{order?.id || 'LOADING'}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '15px' }}>
              <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, marginBottom: '8px' }}>{t('totalAmount')}</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: theme.accent }}>{cartTotal.toFixed(2)} ₺</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '15px' }}>
              <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, marginBottom: '8px' }}>{t('itemsCount')}</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: theme.text }}>{cart.length}</div>
            </div>
          </div>

          <button 
            onClick={() => { onComplete && onComplete(); navigate('/dashboard'); }}
            style={{
              width: '100%',
              padding: '14px',
              background: theme.accent,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 900,
              cursor: 'pointer',
              fontSize: '13px',
              boxShadow: `0 4px 15px ${theme.accentGlow}`
            }}
          >
            {t('viewOrders')}
          </button>
        </div>
      </div>
    );
  }
}

// --- STOREFRONT WITH SEARCH, FILTER & CART ---
function StoreFront({ showToast }) {
  const { t } = useTranslation();
  const [products, setProducts] = useState([])
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('userFavorites') || '[]'); } catch { return []; }
  });
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  useEffect(() => { document.title = 'NEXUS'; }, []);

  useEffect(() => {
    fetch('http://localhost:8001/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch((err) => {
        showToast("Failed to sync inventory");
      });
  }, [])

  const toggleFavorite = (productId) => {
    if (!token) {
      showToast('Please log in to add favorites', 'error');
      navigate('/login');
      return;
    }
    let updated;
    if (favorites.includes(productId)) {
      updated = favorites.filter(id => id !== productId);
      showToast('Removed from favorites', 'success');
    } else {
      updated = [...favorites, productId];
      showToast('Added to favorites', 'success');
    }
    setFavorites(updated);
    localStorage.setItem('userFavorites', JSON.stringify(updated));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let updated;
    if (existingItem) {
      updated = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    showToast(`${product.name} added to cart`, 'success');
  };

  const removeFromCart = (productId) => {
    const updated = cart.filter(item => item.id !== productId);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    showToast('Item removed from cart', 'success');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleCheckout = () => {
    if (!token) {
      showToast('Please login first', 'error');
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      showToast('Cart is empty', 'error');
      return;
    }
    setShowCart(false);
    setShowCheckout(true);
  };

  const getCategories = () => {
    const categories = new Set(products.map(p => p.brand || 'Other'));
    return Array.from(categories).sort();
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const removeCategory = (category) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategories.length > 0) {
      matchesCategory = selectedCategories.includes(p.brand || 'Other');
    }
    
    return matchesSearch && matchesCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (showCheckout && token) {
    return <CheckoutFlow cart={cart} showToast={showToast} navigate={navigate} onComplete={() => { setShowCheckout(false); setCart([]); }} />;
  }

  return (
    <div>
      <header style={headerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '11px', color: theme.accent, fontWeight: 900, letterSpacing: '4px' }}>{t('nexusMarket')}</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => setShowCart(!showCart)}
              style={{
                ...topNavBtn,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '46px',
                padding: 0,
                fontSize: '16px',
                lineHeight: 1
              }}
            >
              🛒
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: theme.accent,
                  color: '#fff',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 900
                }}>
                  {cart.length}
                </span>
              )}
            </button>
            {!token ? (
              <button onClick={() => navigate('/login')} style={topNavBtn}>{t('login')}</button>
            ) : (
              <>
                <button onClick={() => navigate('/dashboard')} style={topNavBtn}>
                  {role === 'admin' ? t('adminPortal') : t('myTerminal')}
                </button>
                <button onClick={() => { 
                  localStorage.clear(); 
                  window.location.reload(); 
                }} style={logoutBtnSmall}>{t('exit')}</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* CART MODAL */}
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 900, pointerEvents: 'all' }}>
          {/* Blocking overlay - prevents ALL interaction with page behind */}
          <div onClick={() => setShowCart(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'absolute', top: '80px', right: 0, bottom: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '0 0 20px 0', pointerEvents: 'none' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '25px', width: '400px', maxWidth: '90vw', height: '70vh', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', pointerEvents: 'all', marginRight: '20px' }}>
            <style>{`::-webkit-scrollbar { display: none; }`}</style>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: `1px solid ${theme.border}`, flexShrink: 0 }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: theme.text }}>{t('shoppingCart')}</h2>
              <button onClick={() => setShowCart(false)} style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.subText, width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: theme.subText }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🛒</div>
                <div style={{ fontWeight: 800 }}>{t('cartEmpty')}</div>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, marginBottom: '20px', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, color: theme.text, marginBottom: '5px' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: theme.accent, fontWeight: 900 }}>{item.price} ₺</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} style={{ background: 'rgba(59,130,246,0.1)', border: `1px solid ${theme.accent}`, color: theme.accent, width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer', fontWeight: 800 }}>-</button>
                        <div style={{ minWidth: '30px', textAlign: 'center', fontWeight: 800, color: theme.text }}>{item.quantity}</div>
                        <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} style={{ background: 'rgba(59,130,246,0.1)', border: `1px solid ${theme.accent}`, color: theme.accent, width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer', fontWeight: 800 }}>+</button>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'rgba(239,68,68,0.1)', border: `1px solid ${theme.danger}`, color: theme.danger, width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer', fontWeight: 800 }}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ paddingTop: '15px', borderTop: `1px solid ${theme.border}`, flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ fontWeight: 800, color: theme.subText }}>{t('total')}</span>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: theme.accent }}>{cartTotal.toFixed(2)} ₺</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    style={{ width: '100%', padding: '12px', background: theme.accent, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '13px', letterSpacing: '1px', boxShadow: `0 4px 15px ${theme.accentGlow}` }}>
                    {t('checkout')}
                  </button>
                </div>
              </>
            )}
          </div>
          </div>
        </div>
      )}

      <div style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(180deg, #050507 0%, #080810 60%, #050507 100%)' }}>
        {/* Animated grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        {/* Radial glow center */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        {/* Accent glow top-left */}
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }} />
        {/* Accent glow bottom-right */}
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', filter: 'blur(30px)' }} />
        {/* Scan line */}
        <div style={{ position: 'absolute', left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)', animation: 'heroScan 6s linear infinite' }} />
        {/* Corner accents */}
        <div style={{ position: 'absolute', top: '30px', left: '30px', width: '60px', height: '60px', borderTop: `2px solid rgba(59,130,246,0.4)`, borderLeft: `2px solid rgba(59,130,246,0.4)` }} />
        <div style={{ position: 'absolute', top: '30px', right: '30px', width: '60px', height: '60px', borderTop: `2px solid rgba(139,92,246,0.3)`, borderRight: `2px solid rgba(139,92,246,0.3)` }} />
        <div style={{ position: 'absolute', bottom: '30px', left: '30px', width: '60px', height: '60px', borderBottom: `2px solid rgba(16,185,129,0.3)`, borderLeft: `2px solid rgba(16,185,129,0.3)` }} />
        <div style={{ position: 'absolute', bottom: '30px', right: '30px', width: '60px', height: '60px', borderBottom: `2px solid rgba(59,130,246,0.4)`, borderRight: `2px solid rgba(59,130,246,0.4)` }} />
        <style>{`
          @keyframes heroScan { 0%{top:-2px} 100%{top:100%} }
          @keyframes heroPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
          @keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes heroFadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
          @keyframes heroGlitch { 0%,100%{clip-path:inset(0 0 100% 0)} 5%{clip-path:inset(10% 0 85% 0)} 10%{clip-path:inset(40% 0 50% 0)} 15%{clip-path:inset(0 0 100% 0)} }
          @keyframes heroBlink { 0%,100%{opacity:1} 50%{opacity:0} }
          .hero-cta-btn:hover { background: #2563eb !important; transform: translateY(-2px); box-shadow: 0 12px 35px rgba(59,130,246,0.5) !important; }
          .hero-outline-btn:hover { background: rgba(255,255,255,0.08) !important; color: #fff !important; border-color: rgba(255,255,255,0.3) !important; }
        `}</style>

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px', padding: '0 40px', animation: 'heroFadeUp 0.8s ease-out' }}>
          {/* System badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '20px', marginBottom: '30px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: theme.success, animation: 'heroPulse 2s infinite' }} />
            <span style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '3px' }}>{t('heroBadge')}</span>
          </div>

          {/* Main title */}
          <div style={{ fontSize: 'clamp(48px, 9vw, 96px)', fontWeight: 900, lineHeight: 1, marginBottom: '20px', letterSpacing: '-2px' }}>
            <div style={{ color: '#fff' }}>{t('heroTitle1')}</div>
            <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('heroTitle2')}</div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5))' }} />
            <div style={{ fontSize: '10px', color: theme.subText, fontWeight: 800, letterSpacing: '4px' }}>{t('quantumEncrypted')}</div>
            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(90deg, rgba(59,130,246,0.5), transparent)' }} />
          </div>

          {/* Subtitle */}
          <p style={{ color: theme.subText, fontSize: '15px', lineHeight: 1.8, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            {t('heroSub1')}<br/>{t('heroSub2')}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
            <button className="hero-cta-btn" onClick={() => { const el = document.getElementById('products-grid'); if(el) el.scrollIntoView({behavior:'smooth'}); }}
              style={{ padding: '16px 36px', background: theme.accent, color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '13px', letterSpacing: '2px', boxShadow: `0 6px 25px ${theme.accentGlow}`, transition: 'all 0.2s' }}>
              {t('exploreInventory')}
            </button>
            {!token && <button className="hero-outline-btn" onClick={() => window.location.href='/login'}
              style={{ padding: '16px 36px', background: 'transparent', color: theme.subText, border: `1px solid ${theme.border}`, borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '13px', letterSpacing: '2px', transition: 'all 0.2s' }}>
              {t('accessTerminal')}
            </button>}
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            {[
              { val: '256-BIT', labelKey: 'encryption' },
              { val: '99.9%', labelKey: 'uptime' },
              { val: 'GEN-5', labelKey: 'hardware' },
              { val: '24/7', labelKey: 'support' },
            ].map(s => (
              <div key={s.labelKey} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: theme.accent, letterSpacing: '-0.5px' }}>{s.val}</div>
                <div style={{ fontSize: '9px', color: theme.subText, fontWeight: 800, letterSpacing: '2px', marginTop: '4px' }}>{t(s.labelKey).toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main id="products-grid" style={{ padding: '40px 5%', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* SEARCH & FILTER SECTION */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', position: 'relative' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '10px',
                  color: theme.text,
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: '"Inter", sans-serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                style={{
                  padding: '10px 16px',
                  background: selectedCategories.length > 0 ? theme.accent : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${selectedCategories.length > 0 ? theme.accent : theme.border}`,
                  color: selectedCategories.length > 0 ? '#fff' : theme.subText,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 800,
                  transition: '0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {t('allProducts')}
                <span style={{ fontSize: '10px' }}>▼</span>
              </button>

              {/* Dropdown Menu */}
              {categoryDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    marginTop: '8px',
                    zIndex: 100,
                    minWidth: '200px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {getCategories().map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        toggleCategory(cat);
                        setCategoryDropdownOpen(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        background: selectedCategories.includes(cat) ? 'rgba(59,130,246,0.1)' : 'transparent',
                        border: 'none',
                        color: selectedCategories.includes(cat) ? theme.accent : theme.text,
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: selectedCategories.includes(cat) ? 900 : 700,
                        textAlign: 'left',
                        borderLeft: `3px solid ${selectedCategories.includes(cat) ? theme.accent : 'transparent'}`,
                        transition: '0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {selectedCategories.includes(cat) ? '✓' : ''} {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected Categories Display */}
          {selectedCategories.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {selectedCategories.map(cat => (
                <div
                  key={cat}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    background: 'rgba(59,130,246,0.15)',
                    border: `1px solid ${theme.accent}`,
                    borderRadius: '6px',
                    color: theme.accent,
                    fontSize: '11px',
                    fontWeight: 800
                  }}
                >
                  {cat}
                  <button
                    onClick={() => removeCategory(cat)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: theme.accent,
                      cursor: 'pointer',
                      fontSize: '14px',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            <div style={{ fontWeight: 900, fontSize: '20px', color: theme.text, marginBottom: '8px' }}>{t('noProductsFound')}</div>
            <div style={{ color: theme.subText, fontSize: '13px' }}>{t('tryDifferentKeywords')}</div>
          </div>
        ) : (
          <div style={gridStyle}>
            {filteredProducts.map(p => {
              const isFav = favorites.includes(p.id);
              const inCart = cart.find(item => item.id === p.id);
              return (
                <div key={p.id} style={enhancedCardStyle}>
                  <div style={enhancedImgContainer}>
                    <div style={holographicGlow}></div>
                    <div style={imgDepthGrid}></div>
                    {/* FAVORITE BUTTON */}
                    <button 
                      onClick={() => toggleFavorite(p.id)}
                      style={{
                        position: 'absolute', top: '15px', right: '15px', zIndex: 10,
                        background: 'rgba(0,0,0,0.5)', border: `1px solid ${isFav ? theme.accent : theme.border}`,
                        color: isFav ? theme.accent : '#fff', cursor: 'pointer',
                        width: '35px', height: '35px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px', backdropFilter: 'blur(5px)', transition: '0.3s'
                      }}
                    >
                      {isFav ? '♥' : '♡'}
                    </button>
                    
                    {p.image ? (
                      <img src={`http://localhost:8001/storage/${p.image}`} style={enhancedProductImg} alt={p.name} />
                    ) : (
                      <div style={{color: theme.subText, fontSize: '10px'}}>[ NO IMAGE ]</div>
                    )}
                  </div>
                  
                  <div style={enhancedCardInfo}>
                    <h4 style={enhancedProductName}>{p.name}</h4>
                    <div style={enhancedProductMeta}>GEN-5 HARDWARE // {p.brand || 'COMPATIBLE'}</div>
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: theme.accent, marginTop: '12px', marginBottom: '12px' }}>{p.price} ₺</div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => setSelectedProduct(p)} style={{ flex: 1, padding: '8px', background: 'transparent', border: `1px solid ${theme.border}`, color: theme.text, cursor: 'pointer', fontSize: '11px', borderRadius: '4px', fontWeight: 800 }}>{t('analysis')}</button>
                      <button 
                        onClick={() => addToCart(p)}
                        style={{ 
                          flex: 1, 
                          padding: '8px', 
                          background: inCart ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)', 
                          border: `1px solid ${inCart ? theme.success : theme.accent}`,
                          color: inCart ? theme.success : theme.accent, 
                          cursor: 'pointer', 
                          fontSize: '11px', 
                          borderRadius: '4px', 
                          fontWeight: 800 
                        }}
                      >
                        🛒 {inCart ? '✓' : t('add')}
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setSelectedProduct(null); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', padding: '20px', overflow: 'hidden' }}>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderTop: `3px solid ${theme.accent}`, borderRadius: '16px', width: '100%', maxWidth: '860px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 28px 16px', borderBottom: `1px solid ${theme.border}`, flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: '9px', color: theme.accent, fontWeight: 900, letterSpacing: '3px', marginBottom: '4px' }}>{t('productAnalysis')}</div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: theme.text }}>{selectedProduct.name}</h2>
              </div>
              <button onClick={() => setSelectedProduct(null)} style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.subText, width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</button>
            </div>

            {/* Body - two columns */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Left: image */}
              <div style={{ width: '360px', flexShrink: 0, background: theme.cardBgLight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', borderRight: `1px solid ${theme.border}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`, backgroundSize: '20px 20px', opacity: 0.2 }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '220px', height: '220px', background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)`, filter: 'blur(30px)' }} />
                {selectedProduct.image
                  ? <img src={`http://localhost:8001/storage/${selectedProduct.image}`} style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.3))' }} alt={selectedProduct.name} />
                  : <div style={{ color: theme.subText, fontSize: '10px', fontWeight: 800, letterSpacing: '1px', zIndex: 2 }}>[ NO IMAGE ]</div>
                }
              </div>

              {/* Right: info */}
              <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px', overflow: 'hidden' }}>
                {/* Info grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: 'rgba(59,130,246,0.08)', border: `1px solid rgba(59,130,246,0.2)`, borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '9px', color: theme.accent, fontWeight: 900, letterSpacing: '1px', marginBottom: '6px' }}>PRODUCT NAME</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: theme.text }}>{selectedProduct.name}</div>
                  </div>
                  <div style={{ background: 'rgba(16,185,129,0.08)', border: `1px solid rgba(16,185,129,0.2)`, borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '9px', color: theme.success, fontWeight: 900, letterSpacing: '1px', marginBottom: '6px' }}>{t('price')}</div>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: theme.accent }}>{selectedProduct.price} ₺</div>
                  </div>
                  <div style={{ background: 'rgba(139,92,246,0.08)', border: `1px solid rgba(139,92,246,0.2)`, borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '9px', color: '#8b5cf6', fontWeight: 900, letterSpacing: '1px', marginBottom: '6px' }}>{t('brand')}</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: theme.text }}>{selectedProduct.brand || 'COMPATIBLE'}</div>
                  </div>
                  <div style={{ background: 'rgba(59,130,246,0.08)', border: `1px solid rgba(59,130,246,0.2)`, borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '9px', color: theme.accent, fontWeight: 900, letterSpacing: '1px', marginBottom: '6px' }}>{t('productId')}</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: theme.text }}>#PRD-{selectedProduct.id}</div>
                  </div>
                </div>

                {/* Specs compact */}
                <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '14px', flex: 1 }}>
                  <div style={{ fontSize: '9px', color: theme.accent, fontWeight: 900, letterSpacing: '1px', marginBottom: '10px' }}>{t('detailedSpecs')}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {[
                      { label: 'Quantum-Encrypted Grade', val: 'Military-grade' },
                      { label: 'Neural-Link', val: 'Full compatibility' },
                      { label: 'Performance Index', val: 'Gen-5 Hardware' },
                      { label: 'Durability', val: 'Lifetime warranty' },
                      { label: 'Status', val: 'System verified' },
                      { label: 'Classification', val: 'Nexus Certified' },
                    ].map(s => (
                      <div key={s.label} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: theme.accent, flexShrink: 0, marginTop: '5px' }} />
                        <div style={{ fontSize: '11px', color: theme.subText }}><span style={{ color: theme.text, fontWeight: 700 }}>{s.label}:</span> {s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                  <button onClick={() => { toggleFavorite(selectedProduct.id); }}
                    style={{ flex: 1, padding: '11px', background: favorites.includes(selectedProduct.id) ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)', border: `1px solid ${favorites.includes(selectedProduct.id) ? theme.danger : theme.accent}`, color: favorites.includes(selectedProduct.id) ? theme.danger : theme.accent, borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '11px', letterSpacing: '0.5px' }}>
                    {favorites.includes(selectedProduct.id) ? t('removeFromFav') : t('addToFav')}
                  </button>
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    style={{ flex: 1, padding: '11px', background: 'rgba(16,185,129,0.1)', border: `1px solid ${theme.success}`, color: theme.success, borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '11px', letterSpacing: '0.5px' }}>
                    {t('addToCart')}
                  </button>
                  <button onClick={() => setSelectedProduct(null)}
                    style={{ padding: '11px 18px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}`, color: theme.text, borderRadius: '8px', fontWeight: 900, cursor: 'pointer', fontSize: '11px' }}>
                    {t('close')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


// --- ADMIN APPLICATIONS TAB ---
function AdminApplicationsTab({ token, userName, showToast, forceUpdate }) {
  const { t } = useTranslation();
  const [apps, setApps] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('nexus_applications') || '[]'); } catch { return []; }
  });

  // Mount anında ve her güncellemede localStorage'dan oku
  React.useEffect(() => {
    const refreshApps = () => {
      try {
        const latest = JSON.parse(localStorage.getItem('nexus_applications') || '[]');
        setApps(latest);
      } catch (_) {}
    };

    // Mount anında en güncel veriyi çek
    refreshApps();

    // Aynı sekme içi eventler
    window.addEventListener('nexus-log-update', refreshApps);
    window.addEventListener('nexus-role-promoted', refreshApps);

    // Farklı sekmelerdeki localStorage değişikliklerini yakala
    const storageHandler = (e) => { if (e.key === 'nexus_applications') refreshApps(); };
    window.addEventListener('storage', storageHandler);

    // BroadcastChannel - en güvenilir cross-tab iletişim
    let bc;
    try {
      bc = new BroadcastChannel('nexus_channel');
      bc.onmessage = (e) => {
        if (e.data?.type === 'NEW_APPLICATION') refreshApps();
      };
    } catch (_) {}

    // Polling fallback - her 2 saniyede bir kontrol et (farklı sekme/oturum için güvenilir)
    const pollInterval = setInterval(refreshApps, 2000);

    return () => {
      window.removeEventListener('nexus-log-update', refreshApps);
      window.removeEventListener('nexus-role-promoted', refreshApps);
      window.removeEventListener('storage', storageHandler);
      clearInterval(pollInterval);
      try { bc?.close(); } catch (_) {}
    };
  }, []);

  const approveApp = async (appId) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    // 1) LocalStorage'daki users listesini güncelle
    const updateLocalUsers = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('nexus_users') || '[]');
        const updatedUsers = storedUsers.map(u =>
          (String(u.id) === String(app.userId) || u.email === app.userEmail)
            ? { ...u, role: 'admin' }
            : u
        );
        localStorage.setItem('nexus_users', JSON.stringify(updatedUsers));
      } catch (_) {}
    };

    // 2) Eğer onaylanan kişi şu an login olan kullanıcıysa, onun da rolünü güncelle
    const updateCurrentUserRole = () => {
      const currentUserId = localStorage.getItem('userId');
      const currentEmail  = localStorage.getItem('userEmail');
      if (String(currentUserId) === String(app.userId) || currentEmail === app.userEmail) {
        localStorage.setItem('userRole', 'admin');
      }
    };

    // 3) Backend'e göndermeyi dene (başarısız olsa bile devam et)
    try {
      const res = await fetch(`http://localhost:8001/api/users/${app.userId}/role`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin' })
      });
      if (!res.ok) {
        await fetch(`http://localhost:8001/api/users/${app.userId}/role`, {
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: 'admin' })
        });
      }
    } catch (_) { /* backend yoksa da devam et */ }

    updateLocalUsers();
    updateCurrentUserRole();
    addLog('ROLECHANGE', { yapan: userName, yapilan: app.userName, yapilan_email: app.userEmail, eski_rol: 'user', yeni_rol: 'admin', zaman: new Date().toISOString() });
    addLog('AUDIT', { user: userName, action: 'APPLICATION_APPROVED', targetId: app.userId });
    const updated = apps.map(a => a.id === appId ? { ...a, status: 'approved' } : a);
    localStorage.setItem('nexus_applications', JSON.stringify(updated));
    setApps(updated);
    forceUpdate(n => n + 1);
    // Notify other open tabs / components that role changed
    window.dispatchEvent(new CustomEvent('nexus-role-promoted', { detail: { userId: app.userId, userEmail: app.userEmail } }));
    showToast(`${app.userName} is now Admin!`, 'success');
  };

  const rejectApp = (appId) => {
    const updated = apps.map(a => a.id === appId ? { ...a, status: 'rejected' } : a);
    localStorage.setItem('nexus_applications', JSON.stringify(updated));
    setApps(updated);
    forceUpdate(n => n + 1);
    showToast('Application rejected.', 'success');
  };

  if (apps.length === 0) return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '14px', padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '36px', marginBottom: '14px' }}>📝</div>
      <div style={{ fontWeight: 900, color: theme.subText, letterSpacing: '2px', fontSize: '13px' }}>{t('noApplicationsYet')}</div>
    </div>
  );

  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '14px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup><col style={{width:'50px'}}/><col style={{width:'140px'}}/><col style={{width:'180px'}}/><col/><col style={{width:'110px'}}/><col style={{width:'170px'}}/></colgroup>
        <thead>
          <tr style={{ background: 'rgba(59,130,246,0.05)', borderBottom: `1px solid ${theme.border}` }}>
            <th style={{ ...th, padding: '14px 16px' }}>#</th>
            <th style={{ ...th, padding: '14px 16px' }}>{t('adUser')}</th>
            <th style={{ ...th, padding: '14px 16px' }}>EMAIL</th>
            <th style={{ ...th, padding: '14px 16px' }}>REASON</th>
            <th style={{ ...th, padding: '14px 16px' }}>STATUS</th>
            <th style={{ ...th, padding: '14px 16px' }}>{t('adAction')}</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app, i) => (
            <tr key={app.id} className="ad-row" style={{ borderBottom: `1px solid ${theme.border}` }}>
              <td style={{ ...td, padding: '14px 16px', color: theme.subText, fontSize: '11px' }}>#{i+1}</td>
              <td style={{ ...td, padding: '14px 16px', fontWeight: 800 }}>{app.userName}</td>
              <td style={{ ...td, padding: '14px 16px', color: theme.subText, fontSize: '12px' }}>{app.userEmail}</td>
              <td style={{ ...td, padding: '14px 16px', color: theme.subText, fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={app.reason}>{app.reason}</td>
              <td style={{ ...td, padding: '14px 16px' }}>
                <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '20px', letterSpacing: '1px', display: 'inline-block',
                  background: app.status === 'approved' ? 'rgba(16,185,129,0.1)' : app.status === 'rejected' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                  color: app.status === 'approved' ? theme.success : app.status === 'rejected' ? theme.danger : '#f59e0b',
                  border: `1px solid ${app.status === 'approved' ? 'rgba(16,185,129,0.3)' : app.status === 'rejected' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
                }}>
                  {app.status === 'approved' ? 'APPROVED' : app.status === 'rejected' ? 'REJECTED' : 'PENDING'}
                </span>
              </td>
              <td style={{ ...td, padding: '14px 16px' }}>
                {app.status === 'pending' ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => approveApp(app.id)} style={{ padding: '6px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: theme.success, borderRadius: '6px', cursor: 'pointer', fontWeight: 800, fontSize: '10px' }}>✓ APPROVE</button>
                    <button onClick={() => rejectApp(app.id)} style={{ padding: '6px 12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: theme.danger, borderRadius: '6px', cursor: 'pointer', fontWeight: 800, fontSize: '10px' }}>✕ REJECT</button>
                  </div>
                ) : <span style={{ color: theme.subText, fontSize: '11px' }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- ADMIN DASHBOARD ---
function AdminDashboard({ showToast }) {
  const { t } = useTranslation();
  const [tab, setTab]               = useState('products');
  const [products, setProducts]     = useState([]);
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(false);
  const [modal, setModal]           = useState(null); 
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm]             = useState({ name: '', brand: '', price: '' });
  const [imgPreview, setImgPreview] = useState(null);
  const [imgFile, setImgFile]       = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState({ show: false, productId: null });
  const [confirmDeleteUser, setConfirmDeleteUser] = useState({ show: false, userId: null, userName: '' });
  const [, forceUpdate]             = useState(0);
  const fileRef                     = useRef(null);
  const navigate                    = useNavigate();
  const userName                    = localStorage.getItem('userName') || 'ADMIN';

  // Re-render on language change so t() picks up new lang
  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    window.addEventListener('nexus-lang-change', handler);
    return () => window.removeEventListener('nexus-lang-change', handler);
  }, []);

  // Live-update when new logs arrive from anywhere in the app
  useEffect(() => { document.title = 'NEXUS'; }, []);
  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    window.addEventListener('nexus-log-update', handler);
    window.addEventListener('nexus-role-promoted', handler);
    // Farklı sekmeden gelen localStorage değişikliklerini yakala
    const storageHandler = (e) => {
      if (e.key === 'nexus_applications' || e.key === 'nexus_logs') {
        forceUpdate(n => n + 1);
      }
    };
    window.addEventListener('storage', storageHandler);
    // Trigger once on mount so existing logStore entries are shown
    forceUpdate(n => n + 1);
    return () => {
      window.removeEventListener('nexus-log-update', handler);
      window.removeEventListener('nexus-role-promoted', handler);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  const token = localStorage.getItem('token');

  const fetchProducts = () => {
    setLoading(true);
    fetch('http://localhost:8001/api/products', { 
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' } 
    })
      .then(r => r.json()).then(d => { setProducts(d); setLoading(false); })
      .catch(err => { addLog('ERROR', { type: 'FETCH_ERR', message: err.message }); setLoading(false); });
  };

  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:8001/api/users', { 
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' } 
    })
      .then(r => r.json())
      .then(d => {
        // Backend'den gelen veriyi localStorage'a kaydet (guncel hali)
        localStorage.setItem('nexus_users', JSON.stringify(d));
        setUsers(d);
        setLoading(false);
      })
      .catch(err => {
        addLog('ERROR', { type: 'FETCH_ERR', message: err.message });
        // Backend yoksa localStorage'dan oku
        try {
          const cached = JSON.parse(localStorage.getItem('nexus_users') || '[]');
          setUsers(cached);
        } catch (_) {}
        setLoading(false);
      });
  };

  useEffect(() => {
    if (tab === 'products') fetchProducts();
    else if (tab === 'users') fetchUsers();
  }, [tab]);

  const openAddModal = () => {
    setEditProduct(null);
    setForm({ name: '', brand: '', price: '' });
    setImgPreview(null);
    setImgFile(null);
    setModal('add');
  };

  const openEditModal = (p) => {
    setEditProduct(p);
    setForm({ name: p.name, brand: p.brand || '', price: p.price });
    setImgPreview(p.image ? `http://localhost:8001/storage/${p.image}` : null);
    setImgFile(null);
    setModal('edit');
  };

  const closeModal = () => {
    setModal(null);
    setEditProduct(null);
    setForm({ name: '', brand: '', price: '' });
    setImgPreview(null);
    setImgFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImgPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return showToast('Only image files allowed');
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImgPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.price) return showToast('Product name and price are required');
    const payload = new FormData();
    payload.append('name',  form.name);
    payload.append('brand', form.brand);
    payload.append('price', form.price);
    if (imgFile) payload.append('image', imgFile);

    try {
      const res = await fetch('http://localhost:8001/api/products', {
        method: 'POST', 
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }, 
        body: payload
      });
      if (res.ok) {
        addLog('PRODUCT', { name: form.name, brand: form.brand, price: form.price, operator: userName, action: 'PRODUCT_ADDED' });
        showToast('Product added successfully', 'success');
        closeModal();
        fetchProducts();
      } else {
        const d = await res.json();
        showToast(d.message || 'Server error');
      }
    } catch (err) {
      addLog('ERROR', { type: 'ADD_ERR', message: err.message });
      showToast('Connection error');
    }
  };

  const handleUpdateProduct = async () => {
    if (!form.name || !form.price) return showToast('Product name and price are required');
    
    const payload = new FormData();
    payload.append('_method', 'PUT'); 
    payload.append('name',  form.name);
    payload.append('brand', form.brand);
    payload.append('price', form.price);
    if (imgFile) payload.append('image', imgFile);

    try {
      const res = await fetch(`http://localhost:8001/api/products/${editProduct.id}`, {
        method: 'POST', 
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }, 
        body: payload
      });
      
      if (res.ok) {
        addLog('PRODUCT', { name: form.name, brand: form.brand, price: form.price, operator: userName, action: 'PRODUCT_UPDATED', productId: editProduct.id });
        showToast('Product updated successfully', 'success');
        closeModal();
        fetchProducts();
      } else {
        const d = await res.json();
        showToast(d.message || 'Server error (500)');
        addLog('ERROR', { type: 'UPDATE_ERR', status: res.status, msg: d.message });
      }
    } catch (err) {
      showToast('Connection error');
    }
  };

  const handleDeleteProduct = async (id) => {
    setConfirmDelete({ show: true, productId: id });
  };

  const confirmDeleteProduct = async () => {
    const id = confirmDelete.productId;
    setConfirmDelete({ show: false, productId: null });
    try {
      const res = await fetch(`http://localhost:8001/api/products/${id}`, {
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (res.ok) {
        addLog('PRODUCT', { operator: userName, action: 'PRODUCT_DELETED', productId: id });
        showToast('Product deleted', 'success');
        fetchProducts();
      } else {
        showToast('Delete failed');
      }
    } catch (err) {
      showToast('Connection error');
    }
  };

  const handleDeleteUser = (id, name, email) => {
    if (id === PROTECTED_ADMIN_ID || email === PROTECTED_ADMIN_EMAIL) {
      showToast('This account cannot be deleted.', 'error');
      return;
    }
    setConfirmDeleteUser({ show: true, userId: id, userName: name });
  };

  const confirmDeleteUserFn = async () => {
    const id = confirmDeleteUser.userId;
    setConfirmDeleteUser({ show: false, userId: null, userName: '' });
    try {
      const res = await fetch(`http://localhost:8001/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (res.ok) {
        addLog('AUDIT', { user: userName, action: 'USER_DELETED', targetId: id });
        showToast('User deleted', 'success');
        fetchUsers();
      } else {
        showToast('Delete failed');
      }
    } catch (err) {
      showToast('Connection error');
    }
  };

  const PROTECTED_ADMIN_ID = 2;
  const PROTECTED_ADMIN_EMAIL = 'admin@nexus.com';

  const isProtectedAdmin = (u) => u.id === PROTECTED_ADMIN_ID || u.email === PROTECTED_ADMIN_EMAIL;

  const handleToggleRole = async (u) => {
    if (isProtectedAdmin(u)) {
      showToast('This account cannot be modified.', 'error');
      return;
    }
    const newRole = u.role === 'admin' ? 'user' : 'admin';

    // LocalStorage users listesini guncelle
    const updateLocalUsers = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('nexus_users') || '[]');
        const updatedUsers = storedUsers.map(su =>
          String(su.id) === String(u.id) ? { ...su, role: newRole } : su
        );
        localStorage.setItem('nexus_users', JSON.stringify(updatedUsers));
      } catch (_) {}
    };

    // Backend'e gondermeyi dene (basarisiz olsa da devam et)
    try {
      let res = await fetch(`http://localhost:8001/api/users/${u.id}/role`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (!res.ok) {
        res = await fetch(`http://localhost:8001/api/users/${u.id}/role`, {
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: newRole })
        });
      }
    } catch (_) { /* backend yoksa da devam et */ }

    updateLocalUsers();
    addLog('AUDIT', { user: userName, action: 'ROLE_CHANGED', targetId: u.id, newRole });
    addLog('ROLECHANGE', {
      yapan: userName,
      yapilan: u.name,
      yapilan_email: u.email,
      eski_rol: u.role || 'user',
      yeni_rol: newRole,
      zaman: new Date().toISOString(),
    });
    // Notify open tabs
    window.dispatchEvent(new CustomEvent('nexus-role-promoted', { detail: { userId: u.id, userEmail: u.email } }));
    showToast(`${u.name} is now ${newRole.toUpperCase()}`, 'success');
    fetchUsers();
  };

  const handleLogout = () => {
    addLog('AUDIT', { user: userName, action: 'ADMIN_LOGOUT', source: 'ADMIN' });
    localStorage.clear();
    navigate('/login');
  };

  const adminMenu = [
    { id: 'products', label: 'Products', count: products.length },
    { id: 'users',    label: 'Users',    count: users.length   },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: theme.bg }}>
      <style>{`
        @keyframes adPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes adScan  { 0%{top:-2px} 100%{top:100%} }
        @keyframes adGlow  { 0%,100%{box-shadow:0 0 15px rgba(59,130,246,0.2)} 50%{box-shadow:0 0 35px rgba(59,130,246,0.5)} }
        @keyframes adFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes adFadeIn{ from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .ad-nav-btn:hover    { background:rgba(59,130,246,0.08)!important; color:#fff!important; }
        .ad-action-btn:hover { background:rgba(255,255,255,0.07)!important; color:#fff!important; }
        .ad-row:hover td     { background:rgba(59,130,246,0.04)!important; }
        .ad-edit-btn:hover   { color:#fff!important; background:rgba(59,130,246,0.12)!important; }
        .ad-del-btn:hover    { color:#fff!important; background:rgba(239,68,68,0.12)!important; }
        .ad-input:focus      { border-color:#3b82f6!important; box-shadow:0 0 0 2px rgba(59,130,246,0.15)!important; outline:none!important; }
      `}</style>

      {/* ── MODAL ── */}
      {modal && (
        <div onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
          <div style={{ background: '#0d0d14', border: `1px solid ${theme.border}`, borderTop: `3px solid ${theme.accent}`, borderRadius: '14px', padding: '36px', width: '780px', maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto', scrollbarWidth: 'none', boxShadow: `0 25px 60px rgba(0,0,0,0.6)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', paddingBottom: '18px', borderBottom: `1px solid ${theme.border}` }}>
              <div>
                <div style={{ fontSize: '9px', color: theme.accent, fontWeight: 900, letterSpacing: '3px', marginBottom: '5px' }}>{modal === 'edit' ? 'MODIFY UNIT' : 'DEPLOY NEW UNIT'}</div>
                <div style={{ fontWeight: 900, fontSize: '17px', color: theme.text }}>{modal === 'edit' ? `Edit Product #${editProduct?.id}` : 'Add New Product'}</div>
              </div>
              <button onClick={closeModal} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}`, color: theme.subText, width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>{t('adProductName')}</label>
                  <input className="ad-input" style={techInput} placeholder="e.g. Quantum Core GPU X9" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>{t('adProductBrand')}</label>
                  <input className="ad-input" style={techInput} placeholder="e.g. NexTech" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>{t('adProductPrice')}</label>
                  <input className="ad-input" style={techInput} type="number" placeholder="0.00" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
                <button onClick={modal === 'edit' ? handleUpdateProduct : handleAddProduct}
                  style={{ padding: '14px', background: theme.accent, color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', borderRadius: '10px', fontSize: '13px', letterSpacing: '1px', boxShadow: `0 4px 20px ${theme.accentGlow}`, transition: 'all 0.2s' }}>
                  {modal === 'edit' ? t('adSaveChanges') : t('adDeployProduct')}
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={labelStyle}>{t('adProductImage')}</label>
                <div style={imgPreview
                    ? { border: `2px solid ${theme.accent}`, borderRadius: '12px', minHeight: '220px', overflow: 'hidden', cursor: 'pointer', background: theme.cardBgLight, boxShadow: `0 0 20px ${theme.accentGlow}` }
                    : { border: `2px dashed rgba(59,130,246,0.3)`, borderRadius: '12px', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(59,130,246,0.03)', flexDirection: 'column', gap: '10px' }
                  }
                  onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => fileRef.current?.click()}>
                  {imgPreview
                    ? <img src={imgPreview} style={{ width: '100%', height: '220px', objectFit: 'contain' }} alt="preview" />
                    : <>
                        <div style={{ fontSize: '28px' }}>📂</div>
                        <div style={{ fontSize: '11px', color: theme.subText, fontWeight: 700, letterSpacing: '1px' }}>CLICK OR DRAG IMAGE</div>
                      </>
                  }
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <div style={{ width: '280px', background: 'rgba(8,8,12,0.97)', borderRight: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50, backdropFilter: 'blur(16px)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />

        {/* Brand */}
        <div style={{ padding: '30px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '9px', color: theme.accent, marginTop: '4px', fontWeight: 700, letterSpacing: '1px' }}>{t('adminControlPanel')}</div>
          <div style={{ marginTop: '10px', padding: '4px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '20px', fontSize: '9px', color: theme.danger, fontWeight: 800, letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: theme.danger, animation: 'adPulse 2s infinite' }} />
            {t('rootAccess')}
          </div>
        </div>

        <div style={{ margin: '0 20px', height: '1px', background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)` }} />

        {/* Stats strip */}
        <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { label: t('adProducts').toUpperCase(), val: products.length, color: theme.accent },
            { label: t('adUsers').toUpperCase(), val: users.length, color: theme.success },
            { label: 'ERRORS',   val: logStore.errors.length,   color: theme.danger },
            { label: 'ROLE LOG',  val: logStore.rolechange.length, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '8px', color: theme.subText, fontWeight: 800, letterSpacing: '1px', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ margin: '0 20px 4px', height: '1px', background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)` }} />

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', scrollbarWidth: 'none' }}>
          {[
            { id: 'products',       labelKey: 'adProducts',  icon: '📦', count: products.length },
            { id: 'users',          labelKey: 'adUsers',     icon: '👥', count: users.length   },
            //{ id: 'applications',   label: 'Applications',     icon: '📝', count: (() => { try { return JSON.parse(localStorage.getItem('nexus_applications') || '[]').filter(a => a.status === 'pending').length; } catch { return 0; } })() },
            { id: 'log-errors',     labelKey: 'adErrorLog',  icon: '🚨', count: logStore.errors.length   },
            { id: 'log-audit',      labelKey: 'adAuditLog',  icon: '🔍', count: logStore.audit.length    },
            { id: 'log-product',    labelKey: 'adProductLog',icon: '📋', count: logStore.product.length  },
            { id: 'log-feedback',   labelKey: 'adFeedbackLog',icon: '💬', count: logStore.feedback.length },
            { id: 'log-rolechange', labelKey: 'adRoleChangeLog',icon: '🔐', count: logStore.rolechange.length },
          ].map(item => {
            const isActive = tab === item.id;
            const isLog = item.id.startsWith('log-');
            return (
              <button key={item.id} className="ad-nav-btn"
                onClick={() => { setTab(item.id); setSearchQuery(''); forceUpdate(n => n + 1); }}
                style={{ width: '100%', padding: '13px 16px', background: isActive ? (isLog ? 'rgba(239,68,68,0.08)' : 'rgba(59,130,246,0.12)') : 'transparent', border: isActive ? `1px solid ${isLog ? 'rgba(239,68,68,0.25)' : 'rgba(59,130,246,0.25)'}` : '1px solid transparent', color: isActive ? '#fff' : theme.subText, display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: 700, borderRadius: '10px', transition: 'all 0.2s', position: 'relative' }}>
                {isActive && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: isLog ? theme.danger : theme.accent, borderRadius: '0 3px 3px 0' }} />}
                <span style={{ fontSize: '15px', marginRight: '12px' }}>{item.icon}</span>
                <span style={{ flex: 1, textAlign: 'left' }}>{item.labelKey ? t(item.labelKey) : item.label}</span>
                <span style={{ fontSize: '10px', color: isActive ? (isLog ? theme.danger : theme.accent) : theme.subText, fontWeight: 900, background: isActive ? (isLog ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)') : 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '10px' }}>{item.count}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '14px 12px', borderTop: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <LanguagePicker />
          <button className="ad-action-btn" onClick={() => navigate('/')}
            style={{ padding: '11px 16px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}`, color: theme.subText, borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px', height: '40px', boxSizing: 'border-box' }}>
            {t('adReturnHome')}
          </button>
          <button onClick={handleLogout}
            style={{ padding: '11px 16px', background: 'rgba(239,68,68,0.06)', border: `1px solid rgba(239,68,68,0.2)`, color: theme.danger, borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px', height: '40px', boxSizing: 'border-box' }}>
            {t('adKillConnection')}
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: theme.bg }}>

        {/* Hero Header */}
        <div style={{ position: 'relative', width: '100%', height: '200px', background: 'linear-gradient(135deg, #050507 0%, #0b0b16 60%, #050507 100%)', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.25 }} />
          <div style={{ position: 'absolute', left: '20%', top: '50%', transform: 'translate(-50%,-50%)', width: '350px', height: '350px', background: `radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)`, filter: 'blur(30px)', animation: 'adFloat 7s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', right: '18%', top: '50%', transform: 'translateY(-50%)', width: '200px', height: '200px', background: `radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)`, filter: 'blur(20px)' }} />
          <div style={{ position: 'absolute', left: 0, width: '100%', height: '1px', background: `linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)`, animation: 'adScan 5s linear infinite' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '50px', height: '50px', borderTop: `2px solid rgba(59,130,246,0.5)`, borderLeft: `2px solid rgba(59,130,246,0.5)` }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50px', height: '50px', borderBottom: `2px solid rgba(239,68,68,0.3)`, borderRight: `2px solid rgba(239,68,68,0.3)` }} />

          <div style={{ position: 'relative', zIndex: 2, padding: '0 50px' }}>
            <div style={{ fontSize: '10px', color: theme.accent, fontWeight: 900, letterSpacing: '5px', marginBottom: '10px', opacity: 0.9 }}>[ SECURE_SYSTEM // V.4.0.2 ]</div>
            <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '0 0 8px 0', color: theme.text, letterSpacing: '-1px' }}>
              Digital <span style={{ color: theme.accent }}>Nexus</span>
            </h1>
            <div style={{ fontSize: '12px', color: theme.subText, fontWeight: 600 }}>
              {t('adAdminConsole')} — <span style={{ color: theme.danger, fontWeight: 900 }}>{t('adRootActive')}</span>
            </div>
          </div>

          {/* Right stat chips */}
          <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '12px', zIndex: 2, alignItems: 'center' }}>
            {[
              { label: t('adProducts').toUpperCase(), val: products.length,          color: theme.accent  },
              { label: t('adUsers').toUpperCase(), val: users.length,             color: theme.success },
              { label: 'ERRORS',   val: logStore.errors.length,   color: theme.danger  },
              { label: 'FEEDBACK', val: logStore.feedback.length, color: '#a78bfa'     },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '12px 16px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${theme.border}`, borderRadius: '10px', backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: '9px', color: theme.subText, fontWeight: 800, letterSpacing: '1px', marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Table toolbar */}
        <div style={{ padding: '28px 44px 20px', borderBottom: `1px solid ${theme.border}`, background: 'rgba(5,5,7,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '9px', color: tab.startsWith('log-') ? theme.danger : theme.accent, fontWeight: 900, letterSpacing: '3px', marginBottom: '4px' }}>
              {tab === 'products' ? t('adProductRegistry') : tab === 'users' ? t('adUserRegistry') : tab === 'applications' ? t('adApplicationLog') : tab === 'log-errors' ? t('adErrorLog') : tab === 'log-audit' ? t('adAuditLog') : tab === 'log-product' ? t('adProductLog') : tab === 'log-rolechange' ? t('adRoleChangeLog') : t('adFeedbackLog')}
            </div>
            <h2 style={{ margin: 0, fontSize: '20px', color: theme.text, fontWeight: 900 }}>
              {tab === 'products' ? t('adProducts') : tab === 'users' ? t('adUsers') : tab === 'applications' ? t('adApplications') : tab === 'log-errors' ? t('adErrorLog') : tab === 'log-audit' ? t('adAuditLog') : tab === 'log-product' ? t('adProductLog') : tab === 'log-rolechange' ? t('adRoleChangeLog') : t('adFeedbackLog')}
              <span style={{ fontSize: '12px', color: tab.startsWith('log-') ? theme.danger : theme.accent, fontWeight: 700, marginLeft: '12px', background: tab.startsWith('log-') ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)', padding: '3px 10px', borderRadius: '20px', border: `1px solid ${tab.startsWith('log-') ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.2)'}` }}>
                {tab === 'products' ? filteredProducts.length : tab === 'users' ? filteredUsers.length : tab === 'log-errors' ? logStore.errors.length : tab === 'log-audit' ? logStore.audit.length : tab === 'log-product' ? logStore.product.length : tab === 'log-rolechange' ? logStore.rolechange.length : logStore.feedback.length} {t('adRecords')}
              </span>
            </h2>
          </div>
          {(tab === 'products' || tab === 'users') && (
            <input className="ad-input"
              type="text"
              placeholder={tab === 'products' ? t('adSearchProducts') : t('adSearchUsers')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ ...techInput, width: '280px', boxSizing: 'border-box', transition: 'all 0.2s' }}
            />
          )}
          {tab === 'products' && (
            <button onClick={openAddModal}
              style={{ padding: '12px 20px', background: theme.accent, color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '12px', letterSpacing: '1px', boxShadow: `0 4px 18px ${theme.accentGlow}`, whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
              {t('adNewProduct')}
            </button>
          )}
          {tab.startsWith('log-') && (() => {
            const logKey = tab === 'log-errors' ? 'errors' : tab === 'log-audit' ? 'audit' : tab === 'log-product' ? 'product' : 'feedback';
            return logStore[logKey].length > 0 ? (
              <button onClick={() => { logStore[logKey].length = 0; _saveLogs(); forceUpdate(n => n + 1); }}
                style={{ padding: '10px 18px', background: 'rgba(239,68,68,0.1)', border: `1px solid rgba(239,68,68,0.3)`, color: theme.danger, borderRadius: '8px', cursor: 'pointer', fontWeight: 900, fontSize: '11px', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                {t('adClearAll')}
              </button>
            ) : null;
          })()}
        </div>

        {/* Table content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px 44px 50px', scrollbarWidth: 'none', animation: 'adFadeIn 0.35s ease-out' }}>
          <style>{`div::-webkit-scrollbar{display:none!important;}`}</style>

          {tab === 'products' && (
            <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '80px' }} />
                  <col style={{ width: '35%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                  <tr style={{ background: 'rgba(59,130,246,0.05)', borderBottom: `1px solid ${theme.border}` }}>
                    <th style={{ ...th, padding: '16px 20px' }}>#ID</th>
                    <th style={{ ...th, padding: '16px 20px' }}>{t('adName')}</th>
                    <th style={{ ...th, padding: '16px 20px' }}>{t('brand').toUpperCase()}</th>
                    <th style={{ ...th, padding: '16px 20px' }}>{t('price')}</th>
                    <th style={{ ...th, padding: '16px 20px', textAlign: 'right' }}>{t('adActions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr><td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: theme.subText, fontSize: '13px' }}>
                      <div style={{ fontSize: '28px', marginBottom: '10px' }}>📦</div>
                      {t('adNoProducts')}
                    </td></tr>
                  ) : (
                    filteredProducts.map((p, i) => (
                      <tr key={p.id} className="ad-row" style={{ borderBottom: `1px solid ${theme.border}`, transition: 'all 0.15s' }}>
                        <td style={{ ...td, padding: '16px 20px' }}>
                          <span style={{ color: theme.accent, fontWeight: 900, fontSize: '12px', background: 'rgba(59,130,246,0.08)', padding: '3px 8px', borderRadius: '6px' }}>#{p.id}</span>
                        </td>
                        <td style={{ ...td, padding: '16px 20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</td>
                        <td style={{ ...td, padding: '16px 20px', color: theme.subText, fontSize: '12px' }}>{p.brand || '—'}</td>
                        <td style={{ ...td, padding: '16px 20px' }}>
                          <span style={{ color: theme.success, fontWeight: 900 }}>{p.price} ₺</span>
                        </td>
                        <td style={{ ...td, padding: '16px 20px', textAlign: 'right' }}>
                          <button className="ad-edit-btn" onClick={() => openEditModal(p)}
                            style={{ marginRight: '8px', padding: '6px 14px', background: 'rgba(59,130,246,0.07)', border: `1px solid rgba(59,130,246,0.2)`, color: theme.accent, borderRadius: '6px', cursor: 'pointer', fontWeight: 800, fontSize: '11px', transition: 'all 0.15s' }}>
                            {t('adEdit')}
                          </button>
                          <button className="ad-del-btn" onClick={() => handleDeleteProduct(p.id)}
                            style={{ padding: '6px 14px', background: 'rgba(239,68,68,0.07)', border: `1px solid rgba(239,68,68,0.2)`, color: theme.danger, borderRadius: '6px', cursor: 'pointer', fontWeight: 800, fontSize: '11px', transition: 'all 0.15s' }}>
                            {t('adDelete')}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'users' && (
            <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '80px' }} />
                  <col style={{ width: '22%' }} />
                  <col style={{ width: '30%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '28%' }} />
                </colgroup>
                <thead>
                  <tr style={{ background: 'rgba(59,130,246,0.05)', borderBottom: `1px solid ${theme.border}` }}>
                    <th style={{ ...th, padding: '16px 20px' }}>#ID</th>
                    <th style={{ ...th, padding: '16px 20px' }}>NAME</th>
                    <th style={{ ...th, padding: '16px 20px' }}>{t('adEmail')}</th>
                    <th style={{ ...th, padding: '16px 20px' }}>{t('adRole')}</th>
                    <th style={{ ...th, padding: '16px 20px', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr><td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: theme.subText, fontSize: '13px' }}>
                      <div style={{ fontSize: '28px', marginBottom: '10px' }}>👥</div>
                      {t('adNoUsers')}
                    </td></tr>
                  ) : (
                    filteredUsers.map(u => {
                      const isSelf = u.name === userName;
                      const isProtected = isProtectedAdmin(u);
                      const cannotAct = isSelf || isProtected;
                      return (
                        <tr key={u.id} className="ad-row" style={{ borderBottom: `1px solid ${theme.border}`, transition: 'all 0.15s' }}>
                          <td style={{ ...td, padding: '16px 20px' }}>
                            <span style={{ color: theme.accent, fontWeight: 900, fontSize: '11px', background: 'rgba(59,130,246,0.08)', padding: '3px 8px', borderRadius: '6px' }}>
                              #{u.uid || u.id}
                            </span>
                          </td>
                          <td style={{ ...td, padding: '16px 20px', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `linear-gradient(135deg, ${theme.accent}, #1d4ed8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{u.name?.[0]?.toUpperCase()}</div>
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</span>
                              {isProtected && <span style={{ fontSize: '9px', color: theme.danger, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: '2px 6px', borderRadius: '10px', fontWeight: 900, letterSpacing: '1px', flexShrink: 0 }}>{t('adProtected')}</span>}
                            </div>
                          </td>
                          <td style={{ ...td, padding: '16px 20px', color: theme.subText, fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email}</td>
                          <td style={{ ...td, padding: '16px 20px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '20px', background: u.role === 'admin' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', color: u.role === 'admin' ? theme.danger : theme.success, border: `1px solid ${u.role === 'admin' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`, letterSpacing: '1px' }}>
                              {(u.role || 'user').toUpperCase()}
                            </span>
                          </td>
                          <td style={{ ...td, padding: '16px 20px', textAlign: 'right' }}>
                            <button
                              onClick={() => !cannotAct && handleToggleRole(u)}
                              disabled={cannotAct}
                              title={isProtected ? 'This account is protected' : isSelf ? 'Cannot change your own role' : u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                              style={{ marginRight: '8px', padding: '6px 12px', background: cannotAct ? 'rgba(255,255,255,0.02)' : u.role === 'admin' ? 'rgba(245,158,11,0.08)' : 'rgba(59,130,246,0.07)', border: `1px solid ${cannotAct ? theme.border : u.role === 'admin' ? 'rgba(245,158,11,0.3)' : 'rgba(59,130,246,0.2)'}`, color: cannotAct ? theme.subText : u.role === 'admin' ? '#f59e0b' : theme.accent, borderRadius: '6px', cursor: cannotAct ? 'not-allowed' : 'pointer', fontWeight: 800, fontSize: '10px', opacity: cannotAct ? 0.4 : 1, transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                              {u.role === 'admin' ? t('adMakeUser') : t('adMakeAdmin')}
                            </button>
                            <button
                              onClick={() => !cannotAct && handleDeleteUser(u.id, u.name, u.email)}
                              disabled={cannotAct}
                              title={isProtected ? 'Bu hesap silinemez' : isSelf ? 'Cannot delete your own account' : 'Delete user'}
                              style={{ padding: '6px 12px', background: cannotAct ? 'rgba(255,255,255,0.02)' : 'rgba(239,68,68,0.07)', border: `1px solid ${cannotAct ? theme.border : 'rgba(239,68,68,0.2)'}`, color: cannotAct ? theme.subText : theme.danger, borderRadius: '6px', cursor: cannotAct ? 'not-allowed' : 'pointer', fontWeight: 800, fontSize: '10px', opacity: cannotAct ? 0.4 : 1, transition: 'all 0.15s' }}>
                              {t('adDelete')}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ── APPLICATIONS TAB ── */}
          {tab === 'applications' && (
            <AdminApplicationsTab token={token} userName={userName} showToast={showToast} forceUpdate={forceUpdate} />
          )}
          {/* ── LOG TABS ── */}
          {tab.startsWith('log-') && (() => {
            const logKey = tab === 'log-errors' ? 'errors' : tab === 'log-audit' ? 'audit' : tab === 'log-product' ? 'product' : tab === 'log-rolechange' ? 'rolechange' : 'feedback';
            const logs = logStore[logKey];
            const logConfig = {
              errors:     { icon: '🚨', color: theme.danger,  emptyIcon: '✅', emptyMsg: 'No errors recorded' },
              audit:      { icon: '🔍', color: theme.accent,  emptyIcon: '📋', emptyMsg: 'No audit events recorded' },
              product:    { icon: '📋', color: theme.success, emptyIcon: '📦', emptyMsg: 'No product events recorded' },
              feedback:   { icon: '💬', color: '#a78bfa',     emptyIcon: '💬', emptyMsg: 'No feedback received yet' },
              rolechange: { icon: '🔐', color: '#f59e0b',     emptyIcon: '🔐', emptyMsg: 'No role changes recorded' },
            };
            const cfg = logConfig[logKey];

            if (logs.length === 0) return (
              <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '14px', padding: '80px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>{cfg.emptyIcon}</div>
                <div style={{ fontWeight: 900, color: theme.subText, letterSpacing: '2px', fontSize: '13px' }}>{cfg.emptyMsg.toUpperCase()}</div>
              </div>
            );

            return (
              <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                  <colgroup>
                    {logKey === 'errors'     && <><col style={{width:'60px'}}/><col style={{width:'180px'}}/><col style={{width:'20%'}}/><col/></>}
                    {logKey === 'audit'      && <><col style={{width:'60px'}}/><col style={{width:'180px'}}/><col style={{width:'20%'}}/><col style={{width:'25%'}}/><col style={{width:'15%'}}/></>}
                    {logKey === 'product'    && <><col style={{width:'60px'}}/><col style={{width:'180px'}}/><col style={{width:'20%'}}/><col/></>}
                    {logKey === 'feedback'   && <><col style={{width:'50px'}}/><col style={{width:'150px'}}/><col style={{width:'120px'}}/><col style={{width:'15%'}}/><col style={{width:'14%'}}/><col style={{width:'13%'}}/><col/></>}
                    {logKey === 'rolechange' && <><col style={{width:'60px'}}/><col style={{width:'170px'}}/><col style={{width:'18%'}}/><col style={{width:'18%'}}/><col style={{width:'12%'}}/><col style={{width:'12%'}}/><col/></>}
                  </colgroup>
                  <thead>
                    <tr style={{ background: 'rgba(59,130,246,0.05)', borderBottom: `1px solid ${theme.border}` }}>
                      <th style={{ ...th, padding: '14px 16px' }}>#</th>
                      <th style={{ ...th, padding: '14px 16px' }}>{t('adTimestamp')}</th>
                      {logKey === 'errors'     && <><th style={{ ...th, padding: '14px 16px' }}>{t('adType')}</th><th style={{ ...th, padding: '14px 16px' }}>{t('adMessage')}</th></>}
                      {logKey === 'audit'      && <><th style={{ ...th, padding: '14px 16px' }}>USER</th><th style={{ ...th, padding: '14px 16px' }}>ACTION</th><th style={{ ...th, padding: '14px 16px' }}>{t('adSource')}</th></>}
                      {logKey === 'product'    && <><th style={{ ...th, padding: '14px 16px' }}>ACTION</th><th style={{ ...th, padding: '14px 16px' }}>DETAILS</th></>}
                      {logKey === 'feedback'   && <><th style={{ ...th, padding: '14px 16px' }}>USER</th><th style={{ ...th, padding: '14px 16px' }}>{t('adSubject')}</th><th style={{ ...th, padding: '14px 16px' }}>{t('adRating')}</th><th style={{ ...th, padding: '14px 16px' }}>{t('adCategory')}</th><th style={{ ...th, padding: '14px 16px' }}>MESSAGE</th></>}
                      {logKey === 'rolechange' && <><th style={{ ...th, padding: '14px 16px', color: '#f59e0b' }}>{t('adChangedBy')}</th><th style={{ ...th, padding: '14px 16px', color: '#f59e0b' }}>{t('adTargetUser')}</th><th style={{ ...th, padding: '14px 16px', color: '#f59e0b' }}>{t('adOldRole')}</th><th style={{ ...th, padding: '14px 16px', color: '#f59e0b' }}>{t('adNewRole')}</th><th style={{ ...th, padding: '14px 16px', color: '#f59e0b' }}>{t('adTimestamp')}</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((entry) => {
                      const d = entry.data;
                      const ts = new Date(entry.timestamp).toLocaleString('tr-TR');
                      const cellBase = { ...td, padding: '14px 16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

                      return (
                        <tr key={entry.id} className="ad-row" style={{ borderBottom: `1px solid ${theme.border}`, transition: 'all 0.15s' }}>
                          <td style={{ ...cellBase, color: theme.subText, fontSize: '11px' }}>#{entry.id}</td>
                          <td style={{ ...cellBase, color: theme.subText, fontSize: '11px' }}>{ts}</td>

                          {logKey === 'errors' && (<>
                            <td style={cellBase}>
                              <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '20px', background: 'rgba(239,68,68,0.1)', color: theme.danger, border: '1px solid rgba(239,68,68,0.3)', letterSpacing: '1px', display: 'inline-block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.type || '—'}</span>
                            </td>
                            <td style={{ ...cellBase, color: theme.subText, fontSize: '12px' }} title={d.message || ''}>{d.message || JSON.stringify(d)}</td>
                          </>)}

                          {logKey === 'audit' && (<>
                            <td style={{ ...cellBase, fontWeight: 800 }}>{d.user || '—'}</td>
                            <td style={cellBase}>
                              <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '20px', background: 'rgba(59,130,246,0.1)', color: theme.accent, border: '1px solid rgba(59,130,246,0.3)', letterSpacing: '1px', display: 'inline-block' }}>{d.action || '—'}</span>
                            </td>
                            <td style={cellBase}>
                              {d.source ? (
                                <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '20px', letterSpacing: '1px', display: 'inline-block',
                                  background: d.source === 'ADMIN' ? 'rgba(239,68,68,0.1)' : d.source === 'AUTH' ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.06)',
                                  color: d.source === 'ADMIN' ? theme.danger : d.source === 'AUTH' ? theme.success : theme.subText,
                                  border: `1px solid ${d.source === 'ADMIN' ? 'rgba(239,68,68,0.3)' : d.source === 'AUTH' ? 'rgba(16,185,129,0.3)' : theme.border}`
                                }}>{d.source}</span>
                              ) : <span style={{ color: theme.subText }}>—</span>}
                            </td>
                          </>)}

                          {logKey === 'product' && (<>
                            <td style={cellBase}>
                              <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '20px', background: 'rgba(16,185,129,0.1)', color: theme.success, border: '1px solid rgba(16,185,129,0.3)', letterSpacing: '1px', display: 'inline-block' }}>{d.action || '—'}</span>
                            </td>
                            <td style={{ ...cellBase, color: theme.subText, fontSize: '12px' }} title={d.name ? `${d.name}${d.brand ? ` · ${d.brand}` : ''}${d.price ? ` · ${d.price}₺` : ''}${d.operator ? ` by ${d.operator}` : ''}` : ''}>
                              {d.name ? `${d.name}${d.brand ? ` · ${d.brand}` : ''}${d.price ? ` · ${d.price}₺` : ''}` : d.user ? `User: ${d.user}${d.total ? ` · Total: ${d.total}₺` : ''}${d.items ? ` · Items: ${d.items}` : ''}` : d.productId ? `Product ID: #${d.productId}` : '—'}
                              {d.operator && <span style={{ color: theme.subText, opacity: 0.7 }}> by {d.operator}</span>}
                            </td>
                          </>)}

                          {logKey === 'feedback' && (<>
                            <td style={{ ...cellBase, fontWeight: 800 }}>{d.user || '—'}</td>
                            <td style={{ ...cellBase, fontSize: '12px' }} title={d.subject || ''}>{d.subject || '—'}</td>
                            <td style={{ ...cellBase, fontSize: '12px', color: '#a78bfa' }} title={d.rating || ''}>{d.rating || '—'}</td>
                            <td style={{ ...cellBase, fontSize: '12px', color: theme.subText }} title={d.category || ''}>{d.category || '—'}</td>
                            <td style={{ ...cellBase, fontSize: '12px', color: theme.subText }} title={d.message || ''}>{d.message || '—'}</td>
                          </>)}

                          {logKey === 'rolechange' && (<>
                            <td style={{ ...cellBase, fontWeight: 800, color: '#f59e0b' }}>{d.yapan || d.changedBy || '—'}</td>
                            <td style={{ ...cellBase, fontWeight: 800 }}>
                              <div>{d.yapilan || d.targetUser || '—'}</div>
                              <div style={{ fontSize: '10px', color: theme.subText }}>{d.yapilan_email || d.targetEmail || ''}</div>
                            </td>
                            <td style={cellBase}>
                              <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '20px', background: (d.eski_rol || d.oldRole) === 'admin' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', color: (d.eski_rol || d.oldRole) === 'admin' ? theme.danger : theme.success, border: `1px solid ${(d.eski_rol || d.oldRole) === 'admin' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`, letterSpacing: '1px', display: 'inline-block' }}>{((d.eski_rol || d.oldRole) || '—').toUpperCase()}</span>
                            </td>
                            <td style={cellBase}>
                              <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '20px', background: (d.yeni_rol || d.newRole) === 'admin' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', color: (d.yeni_rol || d.newRole) === 'admin' ? theme.danger : theme.success, border: `1px solid ${(d.yeni_rol || d.newRole) === 'admin' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`, letterSpacing: '1px', display: 'inline-block' }}>{((d.yeni_rol || d.newRole) || '—').toUpperCase()}</span>
                            </td>
                            <td style={{ ...cellBase, color: theme.subText, fontSize: '11px' }}>{(d.zaman || d.timestamp) ? new Date(d.zaman || d.timestamp).toLocaleString('en-US') : ts}</td>
                          </>)}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── CONFIRM DELETE USER MODAL ── */}
      {confirmDeleteUser.show && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderTop: `3px solid ${theme.danger}`, borderRadius: '14px', padding: '36px', width: '420px', maxWidth: '95vw', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
            <div style={{ fontSize: '36px', textAlign: 'center', marginBottom: '16px' }}>👤</div>
            <div style={{ fontWeight: 900, fontSize: '17px', color: theme.text, textAlign: 'center', marginBottom: '10px' }}>{t('deleteUser')}</div>
            <div style={{ color: theme.subText, fontSize: '13px', textAlign: 'center', marginBottom: '28px', lineHeight: 1.6 }}>
              <span style={{ color: theme.text, fontWeight: 700 }}>{confirmDeleteUser.userName}</span> the user named <br/> will be permanently deleted. This action cannot be undone.
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setConfirmDeleteUser({ show: false, userId: null, userName: '' })}
                style={{ flex: 1, padding: '13px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}`, color: theme.text, borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '13px' }}>
                {t('cancel')}
              </button>
              <button onClick={confirmDeleteUserFn}
                style={{ flex: 1, padding: '13px', background: 'rgba(239,68,68,0.15)', border: `1px solid rgba(239,68,68,0.4)`, color: theme.danger, borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '13px' }}>
                {t('deleteBtn')}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete.show && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderTop: `3px solid ${theme.danger}`, borderRadius: '14px', padding: '36px', width: '420px', maxWidth: '95vw', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
            <div style={{ fontSize: '36px', textAlign: 'center', marginBottom: '16px' }}>🗑</div>
            <div style={{ fontWeight: 900, fontSize: '17px', color: theme.text, textAlign: 'center', marginBottom: '10px' }}>{t('deleteProduct')}</div>
            <div style={{ color: theme.subText, fontSize: '13px', textAlign: 'center', marginBottom: '28px', lineHeight: 1.6 }}>
              {t('permanentlyDeleted')}<br/>{t('cannotBeUndone')}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setConfirmDelete({ show: false, productId: null })}
                style={{ flex: 1, padding: '13px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}`, color: theme.text, borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '13px' }}>
                {t('cancel')}
              </button>
              <button onClick={confirmDeleteProduct}
                style={{ flex: 1, padding: '13px', background: 'rgba(239,68,68,0.15)', border: `1px solid rgba(239,68,68,0.4)`, color: theme.danger, borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '13px' }}>
                {t('deleteBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
// --- CONSOLIDATED STYLES ---

const gridStyle = { 
  display:'grid', 
  gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', 
  gap:'30px',
  paddingBottom: '50px'
};

const enhancedCardStyle = { 
  background: theme.card, 
  border: `1px solid ${theme.border}`, 
  borderLeft: `3px solid ${theme.accent}`, 
  borderRadius: '4px', 
  overflow: 'hidden', 
  display: 'flex', 
  flexDirection: 'column',
  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
  position: 'relative'
};

const enhancedImgContainer = { 
  height: '240px', 
  background: theme.cardBgLight,
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  position: 'relative',
  overflow: 'hidden'
};

const enhancedProductImg = { 
  maxWidth: '75%', 
  maxHeight: '75%', 
  objectFit: 'contain',
  zIndex: 3,
};

const holographicGlow = {
  position: 'absolute',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)',
  filter: 'blur(20px)',
};

const imgDepthGrid = {
  position: 'absolute',
  top: 0, left: 0, width: '100%', height: '100%',
  backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`,
  backgroundSize: '20px 20px',
  opacity: 0.1,
};

const enhancedCardInfo = { padding: '25px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
const enhancedProductName = { margin: '0', fontSize: '17px', fontWeight: 800, color: theme.text };
const enhancedProductMeta = { fontSize: '10px', color: theme.subText, fontWeight: 700, letterSpacing: '1px' };
const priceActionRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' };
const enhancedPriceTag = { fontSize: '20px', fontWeight: 900, color: theme.accent };
const enhancedSpecBtn = { padding: '8px 15px', background: 'transparent', border: `1px solid ${theme.border}`, color: theme.text, cursor: 'pointer', fontSize: '11px', borderRadius: '4px', fontWeight: 800 };

const toastStyles = (type) => ({
  position: 'fixed', bottom: '30px', right: '30px', 
  background: theme.card, color: '#fff',
  padding: '15px 25px', borderRadius: '4px', zIndex: 9999,
  border: `1px solid ${theme.border}`,
  fontSize: '11px', fontWeight: 800,
  display: 'flex', alignItems: 'center', gap: '15px',
});

const toastBar = (type) => ({
  position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
  background: type === 'error' ? theme.danger : theme.accent
});

const authContainer = { height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#050507', position: 'relative' };
const scannerOverlay = { position:'absolute', top:0, left:0, width:'100%', height:'100%', background:'repeating-linear-gradient(0deg, rgba(59,130,246,0.03) 0px, transparent 2px)', pointerEvents:'none' };
const authCard = { background:theme.card, padding:'40px', width:'380px', border:`1px solid ${theme.border}`, borderLeft:`4px solid ${theme.accent}`, borderRadius: '4px', zIndex: 10 };
const cardHeader = { display:'flex', gap:'15px', alignItems:'center', marginBottom:'30px' };
const logoBox = { width:'40px', height:'40px', background:theme.accent, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, color:'#fff', borderRadius: '8px' };
const systemTitle = { margin:0, fontSize:'18px', fontWeight: 900, color: theme.text };
const statusLine = { fontSize:'10px', color:theme.accent, marginTop:'5px', fontWeight:800 };
const blinkDot = { display:'inline-block', width:'6px', height:'6px', background:theme.accent, borderRadius:'50%', marginRight:'5px' };
const techInput = { width:'100%', background:theme.inputBg, border:`1px solid ${theme.border}`, padding:'12px', color:theme.text, boxSizing:'border-box', outline: 'none', borderRadius:'4px' };
const labelStyle = { display:'block', fontSize:'10px', color:theme.accent, marginBottom:'8px', fontWeight:700, letterSpacing:'1px' };
const accessBtn = { width:'100%', padding:'15px', background:theme.accent, color:'#fff', border:'none', fontWeight:900, cursor:'pointer', marginTop: '10px', borderRadius:'4px' };
const toggleBtn = { background:'transparent', border:'none', color:theme.subText, fontSize:'11px', marginTop:'25px', cursor:'pointer', width:'100%', textDecoration: 'underline' };
const headerStyle = { position:'fixed', top:0, left:0, width:'100%', padding:'15px 5%', zIndex:100, background:'rgba(5,5,7,0.85)', backdropFilter:'blur(12px)', borderBottom: `1px solid ${theme.border}`, boxSizing: 'border-box' };
const logoBoxSmall = { width:'32px', height:'32px', background:theme.accent, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, color:'#fff', borderRadius: '6px' };
const topNavBtn = { background:'transparent', border:`1px solid ${theme.border}`, color:theme.text, padding:'8px 18px', borderRadius:'6px', fontSize:'11px', fontWeight:800, cursor:'pointer', height: '36px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' };
const registerBtn = { ...topNavBtn, background: theme.accent, border: 'none', color: '#fff' };
const logoutBtnSmall = { ...topNavBtn, color: theme.danger, borderColor: 'rgba(239, 68, 68, 0.2)' };
const heroSection = { height:'60vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', position:'relative', overflow: 'hidden' };
const gridBackground = { position: 'absolute', width: '200%', height: '200%', background: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`, backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg)', top: '-50%', opacity: 0.2 };
const heroContent = { maxWidth: '800px', zIndex: 1 };
const heroBadge = { fontSize:'11px', color:theme.accent, letterSpacing:'4px', fontWeight: 900, marginBottom: '20px' };
const heroTitle = { fontSize:'clamp(40px, 8vw, 80px)', fontWeight:900, margin:'0 0 20px 0' };
const heroDivider = { width: '60px', height: '4px', background: theme.accent, margin: '20px auto' };
const heroSubText = { color: theme.subText, fontSize: '16px', lineHeight: 1.6 };
const sidebar = { width: '280px', background: theme.card, borderRight: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', height: '100vh',position: 'fixed', left: 0, top: 0, zIndex: 100};
const avatar = { width:'40px', height:'40px', background:theme.accent, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, color: '#fff' };
const sideBtn = { width:'100%', padding:'15px 25px', background:'transparent', border:'none', color:theme.subText, textAlign:'left', cursor:'pointer', fontWeight:700, borderRight: '3px solid transparent', display:'flex', flexDirection:'column' };
const activeSideBtn = { ...sideBtn, color:'#fff', background:'rgba(59, 130, 246, 0.1)', borderRight: `3px solid ${theme.accent}` };
const secondarySideBtn = { padding:'12px', background:'transparent', border:`1px solid ${theme.border}`, color:theme.subText, borderRadius:'8px', cursor:'pointer', fontSize:'12px', margin: '0 20px', fontWeight: 700 };
const dangerSideBtn = { padding:'12px', background:'transparent', border:'none', color:theme.danger, cursor:'pointer', fontSize:'12px', fontWeight:800, margin: '0 20px' };
const tableCard = { background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '20px', marginTop: '20px',width: '100%',boxSizing: 'border-box'};
const th = { textAlign: 'left', padding: '15px', color: theme.accent, fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: theme.card };
const td = { padding: '15px', fontSize: '13px', color: theme.text, textAlign: 'left' };
const mainContainer = {marginLeft: '280px', width: 'calc(100% - 280px)',minHeight: '100vh',display: 'flex',flexDirection: 'column'};
const mainContentStyle = {marginLeft: '280px',};

export default App;